import { configure, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { createDebugContext, withDebugProps } from "./index";
configure({ adapter: new Adapter() });
const Box = (props) => (React.createElement("div", { id: props.id, className: [
        props.debug ? "debug" : "",
        typeof props.debug === "object" && props.debug.color
            ? props.debug.color
            : ""
    ].join(" ") }, props.children || null));
class Steps {
    constructor() {
        this.tree = null;
        this.wrapper = null;
    }
    givenTheTree(tree) {
        this.tree = tree;
    }
    whenTheAppRenders() {
        if (this.tree) {
            const Tree = this.tree;
            const App = () => React.createElement(Tree, null);
            this.wrapper = mount(React.createElement(App, null));
        }
    }
    thenBox(id) {
        return {
            hasDebugTurnedOn: () => {
                if (this.wrapper) {
                    expect(this.wrapper.find(`div#${id}`).hasClass("debug")).toBe(true);
                }
                else {
                    expect(this.wrapper).toBeDefined();
                }
            },
            hasDebugTurnedOff: () => {
                if (this.wrapper) {
                    expect(this.wrapper.find(`div#${id}`).hasClass("debug")).toBe(false);
                }
                else {
                    expect(this.wrapper).toBeDefined();
                }
            },
            hasColor: (color) => {
                if (this.wrapper) {
                    expect(this.wrapper.find(`div#${id}`).hasClass(color)).toBe(true);
                }
                else {
                    expect(this.wrapper).toBeDefined();
                }
            }
        };
    }
    thenTheSnapshotMatches() {
        expect(this.wrapper).toMatchSnapshot();
    }
}
describe("Debug context:", () => {
    let Ctx = createDebugContext(false, {
        box: {
            color: "red"
        }
    });
    let DBox = withDebugProps(Box, Ctx, "box");
    let steps = new Steps();
    beforeEach(() => {
        steps = new Steps();
        Ctx = createDebugContext(false, {
            box: {
                color: "red"
            }
        });
        DBox = withDebugProps(Box, Ctx, "box");
    });
    it("Context has debugging on", () => {
        steps.givenTheTree(() => (React.createElement(Ctx.Provider, { value: { debug: true } },
            React.createElement(DBox, { id: "a" },
                React.createElement(DBox, { id: "b" },
                    React.createElement(DBox, { id: "c" }))))));
        steps.whenTheAppRenders();
        steps.thenTheSnapshotMatches();
        steps.thenBox("a").hasDebugTurnedOn();
        steps.thenBox("b").hasDebugTurnedOn();
        steps.thenBox("c").hasDebugTurnedOn();
    });
    it("Context has debugging off", () => {
        steps.givenTheTree(() => (React.createElement(Ctx.Provider, { value: { debug: false } },
            React.createElement(DBox, { id: "a" },
                React.createElement(DBox, { id: "b" },
                    React.createElement(DBox, { id: "c" }))))));
        steps.whenTheAppRenders();
        steps.thenBox("a").hasDebugTurnedOff();
        steps.thenBox("b").hasDebugTurnedOff();
        steps.thenBox("c").hasDebugTurnedOff();
        steps.thenTheSnapshotMatches();
    });
    it("Element suppress debugging", () => {
        steps.givenTheTree(() => (React.createElement(Ctx.Provider, { value: { debug: true } },
            React.createElement(DBox, { id: "a" },
                React.createElement(DBox, { id: "b", debug: false },
                    React.createElement(DBox, { id: "c" }))))));
        steps.whenTheAppRenders();
        steps.thenBox("a").hasDebugTurnedOn();
        steps.thenBox("b").hasDebugTurnedOff();
        steps.thenBox("c").hasDebugTurnedOn();
        steps.thenTheSnapshotMatches();
    });
    it("Element set to debug", () => {
        steps.givenTheTree(() => (React.createElement(Ctx.Provider, { value: { debug: false } },
            React.createElement(DBox, { id: "a" },
                React.createElement(DBox, { id: "b", debug: true },
                    React.createElement(DBox, { id: "c" }))))));
        steps.whenTheAppRenders();
        steps.thenBox("a").hasDebugTurnedOff();
        steps.thenBox("b").hasDebugTurnedOn();
        steps.thenBox("c").hasDebugTurnedOff();
        steps.thenTheSnapshotMatches();
    });
});
describe("Debug children option:", () => {
    let Ctx = createDebugContext(false, {
        box: {
            color: "red"
        }
    });
    let DBox = withDebugProps(Box, Ctx, "box");
    let steps = new Steps();
    beforeEach(() => {
        steps = new Steps();
        Ctx = createDebugContext(false, {
            box: {
                color: "red"
            }
        });
        DBox = withDebugProps(Box, Ctx, "box");
    });
    it("Suppress child debugging", () => {
        steps.givenTheTree(() => (React.createElement(Ctx.Provider, { value: { debug: true } },
            React.createElement(DBox, { id: "a" },
                React.createElement(DBox, { id: "b", debugDescendants: false },
                    React.createElement(DBox, { id: "c" }))))));
        steps.whenTheAppRenders();
        steps.thenBox("a").hasDebugTurnedOn();
        steps.thenBox("b").hasDebugTurnedOn();
        steps.thenBox("c").hasDebugTurnedOff();
        steps.thenTheSnapshotMatches();
    });
    it("Enable child debugging", () => {
        steps.givenTheTree(() => (React.createElement(Ctx.Provider, { value: { debug: false } },
            React.createElement(DBox, { id: "a" },
                React.createElement(DBox, { id: "b", debugDescendants: true },
                    React.createElement(DBox, { id: "c" }))))));
        steps.whenTheAppRenders();
        steps.thenBox("a").hasDebugTurnedOff();
        steps.thenBox("b").hasDebugTurnedOff();
        steps.thenBox("c").hasDebugTurnedOn();
        steps.thenTheSnapshotMatches();
    });
    it("Element overrides enabled child debugging", () => {
        steps.givenTheTree(() => (React.createElement(Ctx.Provider, { value: { debug: false } },
            React.createElement(DBox, { id: "a", debugDescendants: true },
                React.createElement(DBox, { id: "b", debug: false },
                    React.createElement(DBox, { id: "c" }))))));
        steps.whenTheAppRenders();
        steps.thenBox("a").hasDebugTurnedOff();
        steps.thenBox("b").hasDebugTurnedOff();
        steps.thenBox("c").hasDebugTurnedOn();
        steps.thenTheSnapshotMatches();
    });
    it("Element overrides disabled child debugging", () => {
        steps.givenTheTree(() => (React.createElement(Ctx.Provider, { value: { debug: true } },
            React.createElement(DBox, { id: "a", debugDescendants: false },
                React.createElement(DBox, { id: "b", debug: true },
                    React.createElement(DBox, { id: "c" }))))));
        steps.whenTheAppRenders();
        steps.thenBox("a").hasDebugTurnedOn();
        steps.thenBox("b").hasDebugTurnedOn();
        steps.thenBox("c").hasDebugTurnedOff();
        steps.thenTheSnapshotMatches();
    });
    it("Options are passed from context", () => {
        Ctx = createDebugContext(true, {
            box: {
                color: "red"
            }
        });
        DBox = withDebugProps(Box, Ctx, "box");
        steps.givenTheTree(() => (React.createElement(DBox, { id: "a" },
            React.createElement(DBox, { id: "b" },
                React.createElement(DBox, { id: "c" })))));
        steps.whenTheAppRenders();
        steps.thenBox("a").hasColor("red");
        steps.thenBox("b").hasColor("red");
        steps.thenBox("c").hasColor("red");
        steps.thenTheSnapshotMatches();
    });
    it("Override context options", () => {
        Ctx = createDebugContext(false, {
            box: {
                color: "red"
            }
        });
        DBox = withDebugProps(Box, Ctx, "box");
        steps.givenTheTree(() => (React.createElement(Ctx.Provider, { value: { debug: true, box: { color: "red" } } },
            React.createElement(DBox, { id: "a" },
                React.createElement(DBox, { id: "b", debug: { color: "green" } },
                    React.createElement(DBox, { id: "c" }))))));
        steps.whenTheAppRenders();
        steps.thenBox("a").hasColor("red");
        steps.thenBox("b").hasColor("green");
        steps.thenBox("c").hasColor("red");
        steps.thenTheSnapshotMatches();
    });
    it("Override context with descendant options", () => {
        Ctx = createDebugContext(true, {
            box: {
                color: "red"
            }
        });
        DBox = withDebugProps(Box, Ctx, "box");
        steps.givenTheTree(() => (React.createElement(DBox, { id: "a" },
            React.createElement(DBox, { id: "b", debugDescendants: { color: "green" } },
                React.createElement(DBox, { id: "c" })))));
        steps.whenTheAppRenders();
        steps.thenBox("a").hasColor("red");
        steps.thenBox("b").hasColor("red");
        steps.thenBox("c").hasColor("green");
        steps.thenTheSnapshotMatches();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50ZXN0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBZ0IsTUFBTSxRQUFRLENBQUM7QUFDeEQsT0FBTyxLQUFLLE9BQU8sTUFBTSx5QkFBeUIsQ0FBQztBQUNuRCxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRTdELFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztBQVF0QyxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBSVosRUFBRSxFQUFFLENBQUMsQ0FDSiw2QkFDRSxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFDWixTQUFTLEVBQUU7UUFDVCxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDMUIsT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFDbEQsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSztZQUNuQixDQUFDLENBQUMsRUFBRTtLQUNQLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUVWLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxDQUNuQixDQUNQLENBQUM7QUFFRixNQUFNLEtBQUs7SUFBWDtRQUNVLFNBQUksR0FBb0MsSUFBSSxDQUFDO1FBQzdDLFlBQU8sR0FBd0IsSUFBSSxDQUFDO0lBdUM5QyxDQUFDO0lBdENRLFlBQVksQ0FBQyxJQUE4QjtRQUNoRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBQ00saUJBQWlCO1FBQ3RCLElBQUksSUFBSSxDQUFDLElB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