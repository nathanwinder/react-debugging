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
                    const keyedProps = key
                        ? {
                            [key]: Object.assign({}, d[key], this.props.debugDescendants)
                        }
                        : undefined;
                    return (React.createElement(Ctx.Provider, { value: Object.assign({}, d, { debug: typeof this.props.debugDescendants === "boolean"
                                ? this.props.debugDescendants
                                : this.props.debugDescendants != null }, keyedProps) },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBVS9CLE1BQU0sVUFBVSxrQkFBa0IsQ0FDaEMsS0FBYyxFQUNkLE9BQVc7SUFFWCxNQUFNLEtBQUssbUJBQTJCLEtBQUssSUFBTSxPQUFlLENBQUUsQ0FBQztJQUNuRSxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBb0IsQ0FBQztJQUM3RCxPQUFlLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQztJQUM5QyxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBZ0NELE1BQU0sVUFBVSxjQUFjLENBQzVCLFNBQWlDLEVBQ2pDLFlBQTZCLEVBQzdCLEdBQU87SUFFUCxNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUM7SUFDekIsTUFBTSxjQUFlLFNBQVEsS0FBSyxDQUFDLFNBRWxDO1FBQ1EsTUFBTTtZQUNYLE1BQU0sVUFBVSxxQkFBUyxJQUFJLENBQUMsS0FBYSxDQUFFLENBQUM7WUFDOUMsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQ3hCLE9BQU8sVUFBVSxDQUFDLGdCQUFnQixDQUFDO1lBQ25DLE9BQU8sQ0FDTCxvQkFBQyxHQUFHLENBQUMsUUFBUSxRQUNWLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ0wsSUFBSSxVQUFlLENBQUM7Z0JBRXBCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO29CQUM1QixVQUFVLEdBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUM7aUJBQ25DO3FCQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO29CQUNyQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2lCQUNwQjtxQkFBTTtvQkFDTCxVQUFVLEdBQUcsSUFBSSxDQUFDO2lCQUNuQjtnQkFFRCxJQUFJLFVBQVUsRUFBRTtvQkFDZCxNQUFNLFlBQVksR0FBSSxDQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3JDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBWSxDQUFDO29CQUMvQyxJQUFJLFlBQVksSUFBSSxjQUFjLEVBQUU7d0JBQ2xDLFVBQVUscUJBQ0wsWUFBWSxFQUNaLGNBQWMsQ0FDbEIsQ0FBQztxQkFDSDtpQkFDRjtnQkFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLElBQUksSUFBSSxFQUFFO29CQUN2QyxNQUFNLFVBQVUsR0FBRyxHQUFHO3dCQUNwQixDQUFDLENBQUM7NEJBQ0UsQ0FBQyxHQUFHLENBQUMsb0JBQ0MsQ0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQXdCLENBQ3hDO3lCQUNGO3dCQUNILENBQUMsQ0FBQyxTQUFTLENBQUM7b0JBQ2QsT0FBTyxDQUNMLG9CQUFDLEdBQUcsQ0FBQyxRQUFRLElBQ1gsS0FBSyxvQkFDQyxDQUFTLElBQ2IsS0FBSyxFQUNILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTO2dDQUM5QyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0I7Z0NBQzdCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixJQUFJLElBQUksSUFDdEMsVUFBVTt3QkFHZixvQkFBQyxTQUFTLG9CQUFLLFVBQVUsSUFBRSxLQUFLLEVBQUUsVUFBVSxJQUFJLENBQ25DLENBQ2hCLENBQUM7aUJBQ0g7cUJBQU07b0JBQ0wsT0FBTyxvQkFBQyxTQUFTLG9CQUFLLFVBQVUsSUFBRSxLQUFLLEVBQUUsVUFBVSxJQUFJLENBQUM7aUJBQ3pEO1lBQ0gsQ0FBQyxDQUNZLENBQ2hCLENBQUM7UUFDSixDQUFDO0tBQ0Y7SUFDQSxjQUFzQixDQUFDLFdBQVcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxXQUFXO1FBQzVELFNBQVMsQ0FBQyxJQUFJLFlBQVksQ0FBQztJQUM3QixPQUFPLGNBQXFCLENBQUM7QUFDL0IsQ0FBQyJ9