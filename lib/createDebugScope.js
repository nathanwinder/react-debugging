import * as React from "react";
export function createDebugScope(Context) {
    class DebugProviderClass extends React.PureComponent {
        render() {
            return (React.createElement(Context.Consumer, null, (c) => {
                let debug = c.debug;
                let options = c.options;
                if (!this.props.debug) {
                    debug = false;
                    options = undefined;
                }
                else if (this.props.debug === true) {
                    debug = true;
                }
                else if (typeof this.props.debug === "object") {
                    debug = true;
                    options = c.options ? Object.assign({}, c.options) : {};
                    if (c.options != null) {
                        for (const key of Object.keys(this.props.debug)) {
                            const contextOptions = options[key] || {};
                            const componentOptions = this.props.debug[key];
                            options[key] = Object.assign({}, contextOptions, componentOptions);
                        }
                    }
                }
                return (React.createElement(Context.Provider, { value: { debug, options } }, this.props.children));
            }));
        }
    }
    return DebugProviderClass;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlRGVidWdTY29wZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVEZWJ1Z1Njb3BlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUcvQixNQUFNLFVBQVUsZ0JBQWdCLENBQzlCLE9BQTRDO0lBRTVDLE1BQU0sa0JBQW1CLFNBQVEsS0FBSyxDQUFDLGFBQWlDO1FBQy9ELE1BQU07WUFDWCxPQUFPLENBQ0wsb0JBQUMsT0FBTyxDQUFDLFFBQVEsUUFDZCxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNMLElBQUksS0FBSyxHQUFZLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQzdCLElBQUksT0FBTyxHQUFrQixDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUV2QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7b0JBQ3JCLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ2QsT0FBTyxHQUFHLFNBQVMsQ0FBQztpQkFDckI7cUJBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7b0JBQ3BDLEtBQUssR0FBRyxJQUFJLENBQUM7aUJBQ2Q7cUJBQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtvQkFDL0MsS0FBSyxHQUFHLElBQUksQ0FBQztvQkFDYixPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLG1CQUFPLENBQUMsQ0FBQyxPQUFlLEVBQUcsQ0FBQyxDQUFFLEVBQVUsQ0FBQztvQkFDOUQsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTt3QkFDckIsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7NEJBQy9DLE1BQU0sY0FBYyxHQUFJLE9BQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7NEJBQ25ELE1BQU0sZ0JBQWdCLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ3ZELE9BQWUsQ0FBQyxHQUFHLENBQUMscUJBQ2hCLGNBQWMsRUFDZCxnQkFBZ0IsQ0FDcEIsQ0FBQzt5QkFDSDtxQkFDRjtpQkFDRjtnQkFFRCxPQUFPLENBQ0wsb0JBQUMsT0FBTyxDQUFDLFFBQVEsSUFBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUNILENBQ3BCLENBQUM7WUFDSixDQUFDLENBQ2dCLENBQ3BCLENBQUM7UUFDSixDQUFDO0tBQ0Y7SUFFRCxPQUFPLGtCQUFrQixDQUFDO0FBQzVCLENBQUMifQ==