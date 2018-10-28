import * as React from "react";
export function createDebugContext(enabled, options) {
    const value = { debugging: false, options };
    const context = React.createContext(value);
    context.displayName = "DebugContext";
    context.enabled = enabled;
    return context;
}
export function withDebugProps(Component, debugContext) {
    if (!debugContext.enabled) {
        return Component;
    }
    const Ctx = debugContext;
    class WithDebug extends React.Component {
        render() {
            if (this.props.debug == null) {
                return (React.createElement(Ctx.Consumer, null, (d) => {
                    let debugChildren;
                    if (this.props.debugOptions) {
                        debugChildren = this.props.debugOptions.debugChildren;
                    }
                    else if (d.options) {
                        debugChildren = d.options.debugChildren;
                    }
                    if (debugChildren !== undefined &&
                        debugChildren !== d.debugging) {
                        return (React.createElement(Ctx.Provider, { value: {
                                debugging: debugChildren,
                                options: this.props.debugOptions || d.options
                            } },
                            React.createElement(Component, Object.assign({}, this.props, { debug: d.debugging, debugOptions: this.props.debugOptions || d.options }))));
                    }
                    else {
                        return (React.createElement(Component, Object.assign({}, this.props, { debug: d.debugging, debugOptions: this.props.debugOptions || d.options })));
                    }
                }));
            }
            else {
                return React.createElement(Component, Object.assign({}, this.props));
            }
        }
    }
    WithDebug.displayName = `${Component.displayName ||
        Component.name}.WithDebug`;
    return WithDebug;
}
//# sourceMappingURL=index.js.map