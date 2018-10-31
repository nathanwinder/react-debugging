import * as React from "react";

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type DebugContextValue<O> = O & {
  readonly debug: boolean;
};

export type DebugContext<O> = React.Context<DebugContextValue<O>>;

export function createDebugContext<O = {}>(
  debug: boolean,
  options?: O
): DebugContext<O> {
  const value: DebugContextValue<O> = { debug, ...(options as any) };
  const context = React.createContext(value) as DebugContext<O>;
  (context as any).displayName = "DebugContext";
  return context;
}

export type ScopedDebugOptions<O, K extends keyof O> = O[K];

export interface HasDebug<O, K extends keyof O> {
  debug?: boolean | O[K];
}

export type WithDebugProps<
  P extends HasDebug<O, K>,
  O,
  K extends keyof O
> = Omit<P, "debug"> & {
  debug?: boolean | ScopedDebugOptions<O, K>;
  debugDescendants?: boolean | ScopedDebugOptions<O, K>;
};

export type WithDebug<
  P extends HasDebug<O, K>,
  O,
  K extends keyof O
> = React.ComponentType<WithDebugProps<P, O, K>>;

export function withDebugProps<P extends HasDebug<O, K>, O, K extends keyof O>(
  Component: React.ComponentType<P>,
  debugContext: DebugContext<O>,
  key: K
): React.ComponentType<WithDebugProps<P, O, K>> {
  const Ctx = debugContext;
  class WithDebugClass extends React.Component<WithDebugProps<P, O, K>> {
    public render() {
      const cleanProps = { ...(this.props as any) };
      delete cleanProps.debug;
      delete cleanProps.debugDescendants;
      return (
        <Ctx.Consumer>
          {(d) => {
            let debugProps: any;

            if (this.props.debug == null) {
              debugProps = d.debug || undefined;
            } else if (this.props.debug === false) {
              debugProps = false;
            } else {
              debugProps = true;
            }

            if (debugProps) {
              const contextProps = (d as any)[key];
              const componentProps = this.props.debug as any;
              if (contextProps || componentProps) {
                debugProps = {
                  ...contextProps,
                  ...componentProps
                };
              }
            }

            if (this.props.debugDescendants != null) {
              return (
                <Ctx.Provider
                  value={{
                    ...(d as any),
                    debug:
                      typeof this.props.debugDescendants === "boolean"
                        ? this.props.debugDescendants
                        : this.props.debugDescendants != null,
                    [key]: {
                      ...(d as any)[key],
                      ...(this.props.debugDescendants as any)
                    }
                  }}
                >
                  <Component {...cleanProps} debug={debugProps} />
                </Ctx.Provider>
              );
            } else {
              return <Component {...cleanProps} debug={debugProps} />;
            }
          }}
        </Ctx.Consumer>
      );
    }
  }
  (WithDebugClass as any).displayName = `${Component.displayName ||
    Component.name}.WithDebug`;
  return WithDebugClass;
}
