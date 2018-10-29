import { configure, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { createDebugContext, withDebugProps } from "./index";
configure({ adapter: new Adapter() });
const Box = (props) => (React.createElement("div", { id: props.id, className: props.debug ? "debug" : "" }, props.children || null));
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
            }
        };
    }
    thenTheSnapshotMatches() {
        expect(this.wrapper).toMatchSnapshot();
    }
}
describe("Debug context:", () => {
    let steps = new Steps();
    beforeEach(() => {
        steps = new Steps();
    });
    it("Context has debugging on", () => {
        const Ctx = createDebugContext(true);
        const DBox = withDebugProps(Box, Ctx);
        steps.givenTheTree(() => (React.createElement(Ctx.Provider, { value: { debugging: true } },
            React.createElement(DBox, { id: "a" },
                React.createElement(DBox, { id: "b" },
                    React.createElement(DBox, { id: "c" }))))));
        steps.whenTheAppRenders();
        steps.thenBox("a").hasDebugTurnedOn();
        steps.thenBox("b").hasDebugTurnedOn();
        steps.thenBox("c").hasDebugTurnedOn();
        steps.thenTheSnapshotMatches();
    });
    it("Context has debugging off", () => {
        const Ctx = createDebugContext(true);
        const DBox = withDebugProps(Box, Ctx);
        steps.givenTheTree(() => (React.createElement(Ctx.Provider, { value: { debugging: false } },
            React.createElement(DBox, { id: "a" },
                React.createElement(DBox, { id: "b" },
                    React.createElement(DBox, { id: "c" }))))));
        steps.whenTheAppRenders();
        steps.thenBox("a").hasDebugTurnedOff();
        steps.thenBox("b").hasDebugTurnedOff();
        steps.thenBox("c").hasDebugTurnedOff();
        steps.thenTheSnapshotMatches();
    });
    it("Element supress debugging", () => {
        const Ctx = createDebugContext(true);
        const DBox = withDebugProps(Box, Ctx);
        steps.givenTheTree(() => (React.createElement(Ctx.Provider, { value: { debugging: true } },
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
        const Ctx = createDebugContext(true);
        const DBox = withDebugProps(Box, Ctx);
        steps.givenTheTree(() => (React.createElement(Ctx.Provider, { value: { debugging: false } },
            React.createElement(DBox, { id: "a" },
                React.createElement(DBox, { id: "b", debug: true },
                    React.createElement(DBox, { id: "c" }))))));
        steps.whenTheAppRenders();
        steps.thenBox("a").hasDebugTurnedOff();
        steps.thenBox("b").hasDebugTurnedOn();
        steps.thenBox("c").hasDebugTurnedOff();
        steps.thenTheSnapshotMatches();
    });
    it("Debugging globally disabled", () => {
        const Ctx = createDebugContext(false);
        const DBox = withDebugProps(Box, Ctx);
        steps.givenTheTree(() => (React.createElement(Ctx.Provider, { value: { debugging: true } },
            React.createElement(DBox, { id: "a", debugOptions: { debugChildren: true } },
                React.createElement(DBox, { id: "b", debug: true },
                    React.createElement(DBox, { id: "c" }))))));
        steps.whenTheAppRenders();
        steps.thenBox("a").hasDebugTurnedOff();
        steps.thenBox("b").hasDebugTurnedOff();
        steps.thenBox("c").hasDebugTurnedOff();
        steps.thenTheSnapshotMatches();
    });
});
describe("Debug children option:", () => {
    let steps = new Steps();
    beforeEach(() => {
        steps = new Steps();
    });
    it("Supress child debugging", () => {
        const Ctx = createDebugContext(true);
        const DBox = withDebugProps(Box, Ctx);
        steps.givenTheTree(() => (React.createElement(Ctx.Provider, { value: { debugging: true } },
            React.createElement(DBox, { id: "a" },
                React.createElement(DBox, { id: "b", debugOptions: { debugChildren: false } },
                    React.createElement(DBox, { id: "c" }))))));
        steps.whenTheAppRenders();
        steps.thenBox("a").hasDebugTurnedOn();
        steps.thenBox("b").hasDebugTurnedOn();
        steps.thenBox("c").hasDebugTurnedOff();
        steps.thenTheSnapshotMatches();
    });
    it("Enable child debugging", () => {
        const Ctx = createDebugContext(true);
        const DBox = withDebugProps(Box, Ctx);
        steps.givenTheTree(() => (React.createElement(Ctx.Provider, { value: { debugging: false } },
            React.createElement(DBox, { id: "a" },
                React.createElement(DBox, { id: "b", debugOptions: { debugChildren: true } },
                    React.createElement(DBox, { id: "c" }))))));
        steps.whenTheAppRenders();
        steps.thenBox("a").hasDebugTurnedOff();
        steps.thenBox("b").hasDebugTurnedOff();
        steps.thenBox("c").hasDebugTurnedOn();
        steps.thenTheSnapshotMatches();
    });
    it("Element overrides enabled child debugging", () => {
        const Ctx = createDebugContext(true);
        const DBox = withDebugProps(Box, Ctx);
        steps.givenTheTree(() => (React.createElement(Ctx.Provider, { value: { debugging: false } },
            React.createElement(DBox, { id: "a", debugOptions: { debugChildren: true } },
                React.createElement(DBox, { id: "b", debug: false },
                    React.createElement(DBox, { id: "c" }))))));
        steps.whenTheAppRenders();
        steps.thenBox("a").hasDebugTurnedOff();
        steps.thenBox("b").hasDebugTurnedOff();
        steps.thenBox("c").hasDebugTurnedOn();
        steps.thenTheSnapshotMatches();
    });
    it("Element overrides disabled child debugging", () => {
        const Ctx = createDebugContext(true);
        const DBox = withDebugProps(Box, Ctx);
        steps.givenTheTree(() => (React.createElement(Ctx.Provider, { value: { debugging: true } },
            React.createElement(DBox, { id: "a", debugOptions: { debugChildren: false } },
                React.createElement(DBox, { id: "b", debug: true },
                    React.createElement(DBox, { id: "c" }))))));
        steps.whenTheAppRenders();
        steps.thenBox("a").hasDebugTurnedOn();
        steps.thenBox("b").hasDebugTurnedOn();
        steps.thenBox("c").hasDebugTurnedOff();
        steps.thenTheSnapshotMatches();
    });
    it("Debugging disabled by context overrides context options.", () => {
        const Ctx = createDebugContext(true);
        const DBox = withDebugProps(Box, Ctx);
        steps.givenTheTree(() => (React.createElement(Ctx.Provider, { value: { debugging: false, options: { debugChildren: true } } },
            React.createElement(DBox, { id: "a" },
                React.createElement(DBox, { id: "b" },
                    React.createElement(DBox, { id: "c" }))))));
        steps.whenTheAppRenders();
        steps.thenBox("a").hasDebugTurnedOff();
        steps.thenBox("b").hasDebugTurnedOff();
        steps.thenBox("c").hasDebugTurnedOff();
        steps.thenTheSnapshotMatches();
    });
    // TODO: There is a conflict in requirements between this test and
    // "Debugging disabled by context overrides context options." need
    // to think through the expected behavior.
    it.skip("Debugging enabled by context overrides context options.", () => {
        const Ctx = createDebugContext(true);
        const DBox = withDebugProps(Box, Ctx);
        steps.givenTheTree(() => (React.createElement(Ctx.Provider, { value: { debugging: true, options: { debugChildren: false } } },
            React.createElement(DBox, { id: "a" },
                React.createElement(DBox, { id: "b" },
                    React.createElement(DBox, { id: "c" }))))));
        steps.whenTheAppRenders();
        steps.thenBox("a").hasDebugTurnedOn();
        steps.thenBox("b").hasDebugTurnedOn();
        steps.thenBox("c").hasDebugTurnedOn();
        steps.thenTheSnapshotMatches();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50ZXN0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBZ0IsTUFBTSxRQUFRLENBQUM7QUFDeEQsT0FBTyxLQUFLLE9BQU8sTUFBTSx5QkFBeUIsQ0FBQztBQUNuRCxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRTdELFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztBQUV0QyxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQXNELEVBQUUsRUFBRSxDQUFDLENBQ3RFLDZCQUFLLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFDckQsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQ25CLENBQ1AsQ0FBQztBQUVGLE1BQU0sS0FBSztJQUFYO1FBQ1UsU0FBSSxHQUFvQyxJQUFJLENBQUM7UUFDN0MsWUFBTyxHQUF3QixJQUFJLENBQUM7SUFnQzlDLENBQUM7SUEvQlEsWUFBWSxDQUFDLElBQThCO1FBQ2hELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFDTSxpQkFBaUI7UUFDdEIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsTUFBTSxJQUFJLEdBQTZCLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDakQsTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsb0JBQUMsSUFBSSxPQUFHLENBQUM7WUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsb0JBQUMsR0FBRyxPQUFHLENB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