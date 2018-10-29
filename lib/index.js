import * as React from "react";
export function createDebugContext(enabled, options) {
    const value = { debugging: false, options };
    const context = React.createContext(value);
    context.displayName = "DebugContext";
    context.enabled = enabled;
    return context;
}
export function withDebugProps(Component, debugContext) {
    const Ctx = debugContext;
    class WithDebug extends React.Component {
        render() {
            if (!debugContext.enabled) {
                return (React.createElement(Component, Object.assign({}, this.props, { debug: false, debugOptions: Object.assign({}, this.props.debugOptions, { debugChildren: false }) })));
            }
            return (React.createElement(Ctx.Consumer, null, (d) => {
                let debugChildren;
                const contextDebugging = d.debugging;
                const contextDebugChildren = d.debugging && d.options && d.options.debugChildren === true;
                if (this.props.debugOptions) {
                    debugChildren = this.props.debugOptions.debugChildren;
                }
                else if (d.options) {
                    debugChildren = contextDebugChildren;
                }
                const debug = this.props.debug !== undefined ? this.props.debug : d.debugging;
                if (debugChildren !== undefined && debugChildren !== d.debugging) {
                    return (React.createElement(Ctx.Provider, { value: {
                            debugging: debugChildren,
                            options: this.props.debugOptions || d.options
                        } },
                        React.createElement(Component, Object.assign({}, this.props, { debug: debug, debugOptions: this.props.debugOptions || d.options }))));
                }
                else {
                    return (React.createElement(Component, Object.assign({}, this.props, { debug: debug, debugOptions: this.props.debugOptions || d.options })));
                }
            }));
        }
    }
    WithDebug.displayName = `${Component.displayName ||
        Component.name}.WithDebug`;
    return WithDebug;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBUy9CLE1BQU0sVUFBVSxrQkFBa0IsQ0FDaEMsT0FBZ0IsRUFDaEIsT0FBVztJQUVYLE1BQU0sS0FBSyxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUM1QyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBb0IsQ0FBQztJQUM3RCxPQUFlLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQztJQUM5QyxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMxQixPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBaUNELE1BQU0sVUFBVSxjQUFjLENBSTVCLFNBQWlDLEVBQ2pDLFlBQTZCO0lBRTdCLE1BQU0sR0FBRyxHQUFHLFlBQVksQ0FBQztJQUN6QixNQUFNLFNBQVUsU0FBUSxLQUFLLENBQUMsU0FBK0I7UUFDcEQsTUFBTTtZQUNYLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFO2dCQUN6QixPQUFPLENBQ0wsb0JBQUMsU0FBUyxvQkFDSixJQUFJLENBQUMsS0FBSyxJQUNkLEtBQUssRUFBRSxLQUFLLEVBQ1osWUFBWSxvQkFDTixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQW9CLElBQ25DLGFBQWEsRUFBRSxLQUFLLE9BRXRCLENBQ0gsQ0FBQzthQUNIO1lBQ0QsT0FBTyxDQUNMLG9CQUFDLEdBQUcsQ0FBQyxRQUFRLFFBQ1YsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDTCxJQUFJLGFBQWtDLENBQUM7Z0JBRXZDLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDckMsTUFBTSxvQkFBb0IsR0FDeEIsQ0FBQyxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQztnQkFFL0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRTtvQkFDM0IsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQztpQkFDdkQ7cUJBQU0sSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO29CQUNwQixhQUFhLEdBQUcsb0JBQW9CLENBQUM7aUJBQ3RDO2dCQUVELE1BQU0sS0FBSyxHQUNULElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ2xFLElBQUksYUFBYSxLQUFLLFNBQVMsSUFBSSxhQUFhLEtBQUssQ0FBQyxDQUFDLFNBQVMsRUFBRTtvQkFDaEUsT0FBTyxDQUNMLG9CQUFDLEdBQUcsQ0FBQyxRQUFRLElBQ1gsS0FBSyxFQUFFOzRCQUNMLFNBQVMsRUFBRSxhQUFhOzRCQUN4QixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDLE9BQU87eUJBQzlDO3dCQUVELG9CQUFDLFNBQVMsb0JBQ0osSUFBSSxDQUFDLEtBQUssSUFDZCxLQUFLLEVBQUUsS0FBSyxFQUNaLFlBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUMsT0FBTyxJQUNsRCxDQUNXLENBQ2hCLENBQUM7aUJBQ0g7cUJBQU07b0JBQ0wsT0FBTyxDQUNMLG9CQUFDLFNBQVMsb0JBQ0osSUFBSSxDQUFDLEtBQUssSUFDZCxLQUFLLEVBQUUsS0FBSyxFQUNaLFlBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUMsT0FBTyxJQUNsRCxDQUNILENBQUM7aUJBQ0g7WUFDSCxDQUFDLENBQ1ksQ0FDaEIsQ0FBQztRQUNKLENBQUM7S0FDRjtJQUNBLFNBQWlCLENBQUMsV0FBVyxHQUFHLEdBQUcsU0FBUyxDQUFDLFdBQVc7UUFDdkQsU0FBUyxDQUFDLElBQUksWUFBWSxDQUFDO0lBQzdCLE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMifQ==