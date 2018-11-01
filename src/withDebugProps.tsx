import * as React from "react";
import { DebugContext, HasDebug, WithDebugProps } from "./types";

export function withDebugProps<P, O>(
  Component: React.ComponentType<P>,
  debugContext: DebugContext<O>
): React.ComponentType<P & { debugScope?: boolean }>;
export function withDebugProps<P extends HasDebug<O, K>, O, K extends keyof O>(
  Component: React.ComponentType<P>,
  debugContext: DebugContext<O>,
  key: K
): React.ComponentType<WithDebugProps<P, O, K>>;
export function withDebugProps<P extends HasDebug<O, K>, O, K extends keyof O>(
  Component: React.ComponentType<P>,
  debugContext: DebugContext<O>,
  key?: K
): any {
  const Ctx = debugContext;
  class WithDebugClass extends React.Component<
    K extends never ? P : WithDebugProps<P, O, K>
  > {
    public render() {
      const cleanProps = { ...(this.props as any) };
      delete cleanProps.debug;
      delete cleanProps.debugScope;

      return (
        <Ctx.Consumer>
          {(d) => {
            const debugProps: any = {};
            const componentOptions = d.options && key && d.options[key];

            if (this.props.debug === false) {
              // do nothing, debug props should be empty
              // as there is no debug info to propagate.
            } else if (this.props.debug === true) {
              if (componentOptions) {
                debugProps.debug = componentOptions;
              } else {
                debugProps.debug = true;
              }
            } else if (this.props.debug != null) {
              debugProps.debug = {
                ...(componentOptions as any),
                ...(this.props.debug as any)
              };
            } else {
              if (d.debug) {
                debugProps.debug = componentOptions || true;
              }
            }

            if (!this.props.debugScope) {
              return <Component {...cleanProps} {...debugProps} />;
            } else {
              let debug = d.debug;
              let options: any | undefined;
              if (this.props.debug === false) {
                debug = false;
                options = d.options;
              } else if (this.props.debug) {
                debug = true;
                if (typeof this.props.debug === "object" && key) {
                  options = {
                    ...(d.options as any),
                    [key]: {
                      ...(d.options && (d.options[key] as any)),
                      ...(this.props.debug as any)
                    }
                  };
                }
              }
              return (
                <Ctx.Provider
                  value={{
                    debug,
                    options
                  }}
                >
                  <Component {...cleanProps} {...debugProps} />
                </Ctx.Provider>
              );
            }
          }}
        </Ctx.Consumer>
      );
    }
  }
  (WithDebugClass as any).displayName = `${Component.displayName ||
    Component.name}.WithDebug`;
  return WithDebugClass as any;
}
