import * as React from "react";
export function withDebugProps(Component, debugContext, key) {
    const Ctx = debugContext;
    class WithDebugClass extends React.Component {
        render() {
            const cleanProps = Object.assign({}, this.props);
            delete cleanProps.debug;
            delete cleanProps.debugScope;
            return (React.createElement(Ctx.Consumer, null, (d) => {
                const debugProps = {};
                const componentOptions = d.options && key && d.options[key];
                if (this.props.debug === false) {
                    // do nothing, debug props should be empty
                    // as there is no debug info to propagate.
                }
                else if (this.props.debug === true) {
                    if (componentOptions) {
                        debugProps.debug = componentOptions;
                    }
                    else {
                        debugProps.debug = true;
                    }
                }
                else if (this.props.debug != null) {
                    debugProps.debug = Object.assign({}, componentOptions, this.props.debug);
                }
                else {
                    if (d.debug) {
                        debugProps.debug = componentOptions || true;
                    }
                }
                if (!this.props.debugScope) {
                    return React.createElement(Component, Object.assign({}, cleanProps, debugProps));
                }
                else {
                    let debug = d.debug;
                    let options;
                    if (this.props.debug === false) {
                        debug = false;
                        options = d.options;
                    }
                    else if (this.props.debug) {
                        debug = true;
                        if (typeof this.props.debug === "object" && key) {
                            options = Object.assign({}, d.options, { [key]: Object.assign({}, (d.options && d.options[key]), this.props.debug) });
                        }
                    }
                    return (React.createElement(Ctx.Provider, { value: {
                            debug,
                            options
                        } },
                        React.createElement(Component, Object.assign({}, cleanProps, debugProps))));
                }
            }));
        }
    }
    WithDebugClass.displayName = `${Component.displayName ||
        Component.name}.WithDebug`;
    return WithDebugClass;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aERlYnVnUHJvcHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvd2l0aERlYnVnUHJvcHMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBWS9CLE1BQU0sVUFBVSxjQUFjLENBQzVCLFNBQWlDLEVBQ2pDLFlBQTZCLEVBQzdCLEdBQU87SUFFUCxNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUM7SUFDekIsTUFBTSxjQUFlLFNBQVEsS0FBSyxDQUFDLFNBRWxDO1FBQ1EsTUFBTTtZQUNYLE1BQU0sVUFBVSxxQkFBUyxJQUFJLENBQUMsS0FBYSxDQUFFLENBQUM7WUFDOUMsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQ3hCLE9BQU8sVUFBVSxDQUFDLFVBQVUsQ0FBQztZQUU3QixPQUFPLENBQ0wsb0JBQUMsR0FBRyxDQUFDLFFBQVEsUUFDVixDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNMLE1BQU0sVUFBVSxHQUFRLEVBQUUsQ0FBQztnQkFDM0IsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsT0FBTyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUU1RCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtvQkFDOUIsMENBQTBDO29CQUMxQywwQ0FBMEM7aUJBQzNDO3FCQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO29CQUNwQyxJQUFJLGdCQUFnQixFQUFFO3dCQUNwQixVQUFVLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDO3FCQUNyQzt5QkFBTTt3QkFDTCxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztxQkFDekI7aUJBQ0Y7cUJBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUU7b0JBQ25DLFVBQVUsQ0FBQyxLQUFLLHFCQUNWLGdCQUF3QixFQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQWEsQ0FDN0IsQ0FBQztpQkFDSDtxQkFBTTtvQkFDTCxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUU7d0JBQ1gsVUFBVSxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsSUFBSSxJQUFJLENBQUM7cUJBQzdDO2lCQUNGO2dCQUVELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtvQkFDMUIsT0FBTyxvQkFBQyxTQUFTLG9CQUFLLFVBQVUsRUFBTSxVQUFVLEVBQUksQ0FBQztpQkFDdEQ7cUJBQU07b0JBQ0wsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFDcEIsSUFBSSxPQUF3QixDQUFDO29CQUM3QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTt3QkFDOUIsS0FBSyxHQUFHLEtBQUssQ0FBQzt3QkFDZCxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztxQkFDckI7eUJBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTt3QkFDM0IsS0FBSyxHQUFHLElBQUksQ0FBQzt3QkFDYixJQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssUUFBUSxJQUFJLEdBQUcsRUFBRTs0QkFDL0MsT0FBTyxxQkFDRCxDQUFDLENBQUMsT0FBZSxJQUNyQixDQUFDLEdBQUcsQ0FBQyxvQkFDQSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQVMsQ0FBQyxFQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQWEsSUFFL0IsQ0FBQzt5QkFDSDtxQkFDRjtvQkFDRCxPQUFPLENBQ0wsb0JBQUMsR0FBRyxDQUFDLFFBQVEsSUFDWCxLQUFLLEVBQUU7NEJBQ0wsS0FBSzs0QkFDTCxPQUFPO3lCQUNSO3dCQUVELG9CQUFDLFNBQVMsb0JBQUssVUFBVSxFQUFNLFVBQVUsRUFBSSxDQUNoQyxDQUNoQixDQUFDO2lCQUNIO1lBQ0gsQ0FBQyxDQUNZLENBQ2hCLENBQUM7UUFDSixDQUFDO0tBQ0Y7SUFDQSxjQUFzQixDQUFDLFdBQVcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxXQUFXO1FBQzVELFNBQVMsQ0FBQyxJQUFJLFlBQVksQ0FBQztJQUM3QixPQUFPLGNBQXFCLENBQUM7QUFDL0IsQ0FBQyJ9