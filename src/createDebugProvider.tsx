import * as React from "react";
import { DebugContextValue, DebugScope, DebugScopeProps } from "./types";

export function createDebugScope<O>(
  Context: React.Context<DebugContextValue<O>>
): DebugScope<O> {
  class DebugProviderClass extends React.PureComponent<DebugScopeProps<O>> {
    public render() {
      return (
        <Context.Consumer>
          {(c) => {
            let debug: boolean = c.debug;
            let options: O | undefined = c.options;

            if (!this.props.debug) {
              debug = false;
            } else if (this.props.debug === true) {
              debug = true;
            } else if (typeof this.props.debug === "object") {
              debug = true;
              options = c.options ? { ...(c.options as any) } : ({} as any);
              for (const key of Object.keys(this.props.debug)) {
                const contextOptions = (options as any)[key] || {};
                const componentOptions = (this.props.debug as any)[key];
                (options as any)[key] = {
                  ...contextOptions,
                  ...componentOptions
                };
              }
            }

            return (
              <Context.Provider value={{ debug, options }}>
                {this.props.children}
              </Context.Provider>
            );
          }}
        </Context.Consumer>
      );
    }
  }

  return DebugProviderClass;
}
