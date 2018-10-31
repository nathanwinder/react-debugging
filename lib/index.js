import * as React from "react";
export function createDebugContext(debug, options) {
    const value = Object.assign({ debug }, options);
    const context = React.createContext(value);
    context.displayName = "DebugContext";
    return context;
}
export function withDebugProps(Component, debugContext, key) {
    const Ctx = debugContext;
    class WithDebugClass extends React.Component {
        render() {
            const cleanProps = Object.assign({}, this.props);
            delete cleanProps.debug;
            delete cleanProps.debugDescendants;
            return (React.createElement(Ctx.Consumer, null, (d) => {
                let debugProps;
                if (this.props.debug == null) {
                    debugProps = d.debug || undefined;
                }
                else if (this.props.debug === false) {
                    debugProps = false;
                }
                else {
                    debugProps = true;
                }
                if (debugProps) {
                    const contextProps = d[key];
                    const componentProps = this.props.debug;
                    if (contextProps || componentProps) {
                        debugProps = Object.assign({}, contextProps, componentProps);
                    }
                }
                if (this.props.debugDescendants != null) {
                    return (React.createElement(Ctx.Provider, { value: Object.assign({}, d, { debug: typeof this.props.debugDescendants === "boolean"
                                ? this.props.debugDescendants
                                : this.props.debugDescendants != null, [key]: Object.assign({}, d[key], this.props.debugDescendants) }) },
                        React.createElement(Component, Object.assign({}, cleanProps, { debug: debugProps }))));
                }
                else {
                    return React.createElement(Component, Object.assign({}, cleanProps, { debug: debugProps }));
                }
            }));
        }
    }
    WithDebugClass.displayName = `${Component.displayName ||
        Component.name}.WithDebug`;
    return WithDebugClass;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBVS9CLE1BQU0sVUFBVSxrQkFBa0IsQ0FDaEMsS0FBYyxFQUNkLE9BQVc7SUFFWCxNQUFNLEtBQUssbUJBQTJCLEtBQUssSUFBTSxPQUFlLENBQUUsQ0FBQztJQUNuRSxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBb0IsQ0FBQztJQUM3RCxPQUFlLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQztJQUM5QyxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBdUJELE1BQU0sVUFBVSxjQUFjLENBQzVCLFNBQWlDLEVBQ2pDLFlBQTZCLEVBQzdCLEdBQU07SUFFTixNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUM7SUFDekIsTUFBTSxjQUFlLFNBQVEsS0FBSyxDQUFDLFNBQWtDO1FBQzVELE1BQU07WUFDWCxNQUFNLFVBQVUscUJBQVMsSUFBSSxDQUFDLEtBQWEsQ0FBRSxDQUFDO1lBQzlDLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQztZQUN4QixPQUFPLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNuQyxPQUFPLENBQ0wsb0JBQUMsR0FBRyxDQUFDLFFBQVEsUUFDVixDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNMLElBQUksVUFBZSxDQUFDO2dCQUVwQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtvQkFDNUIsVUFBVSxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDO2lCQUNuQztxQkFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtvQkFDckMsVUFBVSxHQUFHLEtBQUssQ0FBQztpQkFDcEI7cUJBQU07b0JBQ0wsVUFBVSxHQUFHLElBQUksQ0FBQztpQkFDbkI7Z0JBRUQsSUFBSSxVQUFVLEVBQUU7b0JBQ2QsTUFBTSxZQUFZLEdBQUksQ0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNyQyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQVksQ0FBQztvQkFDL0MsSUFBSSxZQUFZLElBQUksY0FBYyxFQUFFO3dCQUNsQyxVQUFVLHFCQUNMLFlBQVksRUFDWixjQUFjLENBQ2xCLENBQUM7cUJBQ0g7aUJBQ0Y7Z0JBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixJQUFJLElBQUksRUFBRTtvQkFDdkMsT0FBTyxDQUNMLG9CQUFDLEdBQUcsQ0FBQyxRQUFRLElBQ1gsS0FBSyxvQkFDQyxDQUFTLElBQ2IsS0FBSyxFQUNILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTO2dDQUM5QyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0I7Z0NBQzdCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixJQUFJLElBQUksRUFDekMsQ0FBQyxHQUFHLENBQUMsb0JBQ0MsQ0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQXdCO3dCQUkzQyxvQkFBQyxTQUFTLG9CQUFLLFVBQVUsSUFBRSxLQUFLLEVBQUUsVUFBVSxJQUFJLENBQ25DLENBQ2hCLENBQUM7aUJBQ0g7cUJBQU07b0JBQ0wsT0FBTyxvQkFBQyxTQUFTLG9CQUFLLFVBQVUsSUFBRSxLQUFLLEVBQUUsVUFBVSxJQUFJLENBQUM7aUJBQ3pEO1lBQ0gsQ0FBQyxDQUNZLENBQ2hCLENBQUM7UUFDSixDQUFDO0tBQ0Y7SUFDQSxjQUFzQixDQUFDLFdBQVcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxXQUFXO1FBQzVELFNBQVMsQ0FBQyxJQUFJLFlBQVksQ0FBQztJQUM3QixPQUFPLGNBQWMsQ0FBQztBQUN4QixDQUFDIn0=