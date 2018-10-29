import * as React from "react";

export type DebugContext<O extends IDebugOptions> = React.Context<{
  debugging: boolean;
  options?: O;
}> & {
  enabled: boolean;
};

export function createDebugContext<D, O = D & IDebugOptions>(
  enabled: boolean,
  options?: D
): DebugContext<O> {
  const value = { debugging: false, options };
  const context = React.createContext(value) as DebugContext<O>;
  (context as any).displayName = "DebugContext";
  context.enabled = enabled;
  return context;
}

export interface IDebugContextValue {
  debugging: boolean;
}

export type IWithDebug<P extends { debug?: boolean }> = React.ComponentType<P>;

export interface IDebuggable<O> {
  debug?: boolean;
  debugOptions?: O;
}

export interface IDebugOptions {
  /**
   * Enables debugging for child components
   */
  debugChildren?: boolean;
}

// tslint:disable-next-line:interface-over-type-literal
export type WithDebugProps<P, O extends IDebugOptions> = P & {
  /**
   * Enables debugging for this component
   */
  debug?: boolean;

  /**
   * Debug options
   */
  debugOptions?: O;
};

export function withDebugProps<
  P extends IDebuggable<O>,
  O extends IDebugOptions
>(
  Component: React.ComponentType<P>,
  debugContext: DebugContext<O>
): React.ComponentType<WithDebugProps<P, O>> {
  const Ctx = debugContext;
  class WithDebug extends React.Component<WithDebugProps<P, O>> {
    public render() {
      if (!debugContext.enabled) {
        return (
          <Component
            {...this.props}
            debug={false}
            debugOptions={{
              ...(this.props.debugOptions as any),
              debugChildren: false
            }}
          />
        );
      }
      return (
        <Ctx.Consumer>
          {(d) => {
            let debugChildren: boolean | undefined;

            const contextDebugging = d.debugging;
            const contextDebugChildren =
              d.debugging && d.options && d.options.debugChildren === true;

            if (this.props.debugOptions) {
              debugChildren = this.props.debugOptions.debugChildren;
            } else if (d.options) {
              debugChildren = contextDebugChildren;
            }

            const debug =
              this.props.debug !== undefined ? this.props.debug : d.debugging;
            if (debugChildren !== undefined && debugChildren !== d.debugging) {
              return (
                <Ctx.Provider
                  value={{
                    debugging: debugChildren,
                    options: this.props.debugOptions || d.options
                  }}
                >
                  <Component
                    {...this.props}
                    debug={debug}
                    debugOptions={this.props.debugOptions || d.options}
                  />
                </Ctx.Provider>
              );
            } else {
              return (
                <Component
                  {...this.props}
                  debug={debug}
                  debugOptions={this.props.debugOptions || d.options}
                />
              );
            }
          }}
        </Ctx.Consumer>
      );
    }
  }
  (WithDebug as any).displayName = `${Component.displayName ||
    Component.name}.WithDebug`;
  return WithDebug;
}
