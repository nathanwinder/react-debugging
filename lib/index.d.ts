import * as React from "react";
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare type DebugContextValue<O> = O & {
    readonly debug: boolean;
};
export declare type DebugContext<O> = React.Context<DebugContextValue<O>>;
export declare function createDebugContext<O = {}>(debug: boolean, options?: O): DebugContext<O>;
export declare type ScopedDebugOptions<O, K extends keyof O> = O[K];
export interface HasDebug<O, K extends keyof O> {
    debug?: boolean | O[K];
}
export declare type WithDebugProps<P extends HasDebug<O, K>, O, K extends keyof O> = Omit<P, "debug"> & {
    debug?: boolean | ScopedDebugOptions<O, K>;
    debugDescendants?: boolean | ScopedDebugOptions<O, K>;
};
export declare type WithDebug<P extends HasDebug<O, K>, O, K extends keyof O> = React.ComponentType<WithDebugProps<P, O, K>>;
export declare function withDebugProps<P extends HasDebug<O, K>, O, K extends keyof O>(Component: React.ComponentType<P>, debugContext: DebugContext<O>, key: K): React.ComponentType<WithDebugProps<P, O, K>>;
//# sourceMappingURL=index.d.ts.map