import * as React from "react";
export declare type DebugContext<O extends IDebugOptions> = React.Context<{
    debugging: boolean;
    options?: O;
}> & {
    enabled: boolean;
};
export declare function createDebugContext<D, O = D & IDebugOptions>(enabled: boolean, options?: D): DebugContext<O>;
export interface IDebugContextValue {
    debugging: boolean;
}
export declare type IWithDebug<P extends {
    debug?: boolean;
}> = React.ComponentType<P>;
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
export declare type WithDebugProps<P, O extends IDebugOptions> = P & {
    /**
     * Enables debugging for this component
     */
    debug?: boolean;
    /**
     * Debug options
     */
    debugOptions?: O;
};
export declare function withDebugProps<P extends IDebuggable<O>, O extends IDebugOptions>(Component: React.ComponentType<P>, debugContext: DebugContext<O>): React.ComponentType<WithDebugProps<P, O>>;
//# sourceMappingURL=index.d.ts.map