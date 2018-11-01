import * as React from "react";
import { createDebugScope } from "./createDebugProvider";
export function createDebugContext(debug, options) {
    const value = { debug, options };
    const context = React.createContext(value);
    const debugContext = {
        Provider: context.Provider,
        Scope: createDebugScope(context),
        Consumer: context.Consumer
    };
    debugContext.displayName = "DebugContext";
    return debugContext;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlRGVidWdDb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NyZWF0ZURlYnVnQ29udGV4dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFHekQsTUFBTSxVQUFVLGtCQUFrQixDQUNoQyxLQUFjLEVBQ2QsT0FBVztJQUVYLE1BQU0sS0FBSyxHQUF5QixFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUN2RCxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLE1BQU0sWUFBWSxHQUFvQjtRQUNwQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7UUFDMUIsS0FBSyxFQUFFLGdCQUFnQixDQUFJLE9BQU8sQ0FBQztRQUNuQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7S0FDM0IsQ0FBQztJQUNELFlBQW9CLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQztJQUNuRCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDIn0=