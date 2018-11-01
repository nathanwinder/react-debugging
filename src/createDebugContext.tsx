import * as React from "react";
import { createDebugScope } from "./createDebugProvider";
import { DebugContext, DebugContextValue } from "./types";

export function createDebugContext<O = never>(
  debug: boolean,
  options?: O
): DebugContext<O> {
  const value: DebugContextValue<O> = { debug, options };
  const context = React.createContext(value);
  const debugContext: DebugContext<O> = {
    Provider: context.Provider,
    Scope: createDebugScope<O>(context),
    Consumer: context.Consumer
  };
  (debugContext as any).displayName = "DebugContext";
  return debugContext;
}
