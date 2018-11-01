/// <reference types="react" />
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export interface DebugContextValue<O> {
    readonly debug: boolean;
    readonly options?: O;
}
export interface DebugContext<O> {
    Provider: React.Provider<DebugContextValue<O>>;
    Consumer: React.Consumer<DebugContextValue<O>>;
    Scope: DebugScope<O>;
}
export declare type ScopedDebugOptions<O, K extends keyof O> = O[K];
export interface HasDebug<O, K extends keyof O> {
    debug?: boolean | O[K];
}
export declare type WithDebugProps<P extends HasDebug<O, K>, O, K extends keyof O> = Omit<P, "debug"> & {
    debug?: boolean | ScopedDebugOptions<O, K>;
    debugScope?: boolean;
};
export declare type WithDebug<P extends HasDebug<O, K>, O, K extends keyof O> = React.ComponentType<WithDebugProps<P, O, K>>;
export interface DebugScopeProps<O> {
    debug?: boolean | O;
}
export declare type DebugScope<O> = React.ComponentType<DebugScopeProps<O>>;
//# sourceMappingURL=types.d.ts.map