import * as React from "react";
import { DebugContext, HasDebug, WithDebugProps } from "./types";
export declare function withDebugProps<P, O>(Component: React.ComponentType<P>, debugContext: DebugContext<O>): React.ComponentType<P & {
    debugScope?: boolean;
}>;
export declare function withDebugProps<P extends HasDebug<O, K>, O, K extends keyof O>(Component: React.ComponentType<P>, debugContext: DebugContext<O>, key: K): React.ComponentType<WithDebugProps<P, O, K>>;
//# sourceMappingURL=withDebugProps.d.ts.map