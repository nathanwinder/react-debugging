import { configure, mount, ReactWrapper } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { createDebugContext, withDebugProps } from "./index";

configure({ adapter: new Adapter() });

const Box = (props: { id: string; debug?: boolean; children?: any }) => (
  <div id={props.id} className={props.debug ? "debug" : ""}>
    {props.children || null}
  </div>
);

class Steps {
  private tree: React.ComponentType<any> | null = null;
  private wrapper: ReactWrapper | null = null;
  public givenTheTree(tree: React.ComponentType<any>) {
    this.tree = tree;
  }
  public whenTheAppRenders() {
    if (this.tree) {
      const Tree: React.ComponentType<any> = this.tree;
      const App = () => <Tree />;
      this.wrapper = mount(<App />);
    }
  }
  public thenBox(id: string) {
    return {
      hasDebugTurnedOn: () => {
        if (this.wrapper) {
          expect(this.wrapper.find(`div#${id}`).hasClass("debug")).toBe(true);
        } else {
          expect(this.wrapper).toBeDefined();
        }
      },
      hasDebugTurnedOff: () => {
        if (this.wrapper) {
          expect(this.wrapper.find(`div#${id}`).hasClass("debug")).toBe(false);
        } else {
          expect(this.wrapper).toBeDefined();
        }
      }
    };
  }
  public thenTheSnapshotMatches() {
    expect(this.wrapper).toMatchSnapshot();
  }
}

describe("Debug context:", () => {
  let steps: Steps = new Steps();
  beforeEach(() => {
    steps = new Steps();
  });

  it("Context has debugging on", () => {
    const Ctx = createDebugContext(true);
    const DBox = withDebugProps(Box, Ctx);

    steps.givenTheTree(() => (
      <Ctx.Provider value={{ debugging: true }}>
        <DBox id="a">
          <DBox id="b">
            <DBox id="c" />
          </DBox>
        </DBox>
      </Ctx.Provider>
    ));

    steps.whenTheAppRenders();

    steps.thenBox("a").hasDebugTurnedOn();
    steps.thenBox("b").hasDebugTurnedOn();
    steps.thenBox("c").hasDebugTurnedOn();
    steps.thenTheSnapshotMatches();
  });

  it("Context has debugging off", () => {
    const Ctx = createDebugContext(true);
    const DBox = withDebugProps(Box, Ctx);

    steps.givenTheTree(() => (
      <Ctx.Provider value={{ debugging: false }}>
        <DBox id="a">
          <DBox id="b">
            <DBox id="c" />
          </DBox>
        </DBox>
      </Ctx.Provider>
    ));

    steps.whenTheAppRenders();

    steps.thenBox("a").hasDebugTurnedOff();
    steps.thenBox("b").hasDebugTurnedOff();
    steps.thenBox("c").hasDebugTurnedOff();
    steps.thenTheSnapshotMatches();
  });

  it("Element supress debugging", () => {
    const Ctx = createDebugContext(true);
    const DBox = withDebugProps(Box, Ctx);

    steps.givenTheTree(() => (
      <Ctx.Provider value={{ debugging: true }}>
        <DBox id="a">
          <DBox id="b" debug={false}>
            <DBox id="c" />
          </DBox>
        </DBox>
      </Ctx.Provider>
    ));

    steps.whenTheAppRenders();

    steps.thenBox("a").hasDebugTurnedOn();
    steps.thenBox("b").hasDebugTurnedOff();
    steps.thenBox("c").hasDebugTurnedOn();
    steps.thenTheSnapshotMatches();
  });

  it("Element set to debug", () => {
    const Ctx = createDebugContext(true);
    const DBox = withDebugProps(Box, Ctx);

    steps.givenTheTree(() => (
      <Ctx.Provider value={{ debugging: false }}>
        <DBox id="a">
          <DBox id="b" debug={true}>
            <DBox id="c" />
          </DBox>
        </DBox>
      </Ctx.Provider>
    ));

    steps.whenTheAppRenders();

    steps.thenBox("a").hasDebugTurnedOff();
    steps.thenBox("b").hasDebugTurnedOn();
    steps.thenBox("c").hasDebugTurnedOff();
    steps.thenTheSnapshotMatches();
  });

  it("Debugging globally disabled", () => {
    const Ctx = createDebugContext(false);
    const DBox = withDebugProps(Box, Ctx);

    steps.givenTheTree(() => (
      <Ctx.Provider value={{ debugging: true }}>
        <DBox id="a" debugOptions={{ debugChildren: true }}>
          <DBox id="b" debug={true}>
            <DBox id="c" />
          </DBox>
        </DBox>
      </Ctx.Provider>
    ));

    steps.whenTheAppRenders();

    steps.thenBox("a").hasDebugTurnedOff();
    steps.thenBox("b").hasDebugTurnedOff();
    steps.thenBox("c").hasDebugTurnedOff();
    steps.thenTheSnapshotMatches();
  });
});

describe("Debug children option:", () => {
  let steps: Steps = new Steps();
  beforeEach(() => {
    steps = new Steps();
  });

  it("Supress child debugging", () => {
    const Ctx = createDebugContext(true);
    const DBox = withDebugProps(Box, Ctx);

    steps.givenTheTree(() => (
      <Ctx.Provider value={{ debugging: true }}>
        <DBox id="a">
          <DBox id="b" debugOptions={{ debugChildren: false }}>
            <DBox id="c" />
          </DBox>
        </DBox>
      </Ctx.Provider>
    ));

    steps.whenTheAppRenders();

    steps.thenBox("a").hasDebugTurnedOn();
    steps.thenBox("b").hasDebugTurnedOn();
    steps.thenBox("c").hasDebugTurnedOff();
    steps.thenTheSnapshotMatches();
  });

  it("Enable child debugging", () => {
    const Ctx = createDebugContext(true);
    const DBox = withDebugProps(Box, Ctx);

    steps.givenTheTree(() => (
      <Ctx.Provider value={{ debugging: false }}>
        <DBox id="a">
          <DBox id="b" debugOptions={{ debugChildren: true }}>
            <DBox id="c" />
          </DBox>
        </DBox>
      </Ctx.Provider>
    ));

    steps.whenTheAppRenders();

    steps.thenBox("a").hasDebugTurnedOff();
    steps.thenBox("b").hasDebugTurnedOff();
    steps.thenBox("c").hasDebugTurnedOn();
    steps.thenTheSnapshotMatches();
  });

  it("Element overrides enabled child debugging", () => {
    const Ctx = createDebugContext(true);
    const DBox = withDebugProps(Box, Ctx);

    steps.givenTheTree(() => (
      <Ctx.Provider value={{ debugging: false }}>
        <DBox id="a" debugOptions={{ debugChildren: true }}>
          <DBox id="b" debug={false}>
            <DBox id="c" />
          </DBox>
        </DBox>
      </Ctx.Provider>
    ));

    steps.whenTheAppRenders();

    steps.thenBox("a").hasDebugTurnedOff();
    steps.thenBox("b").hasDebugTurnedOff();
    steps.thenBox("c").hasDebugTurnedOn();
    steps.thenTheSnapshotMatches();
  });

  it("Element overrides disabled child debugging", () => {
    const Ctx = createDebugContext(true);
    const DBox = withDebugProps(Box, Ctx);

    steps.givenTheTree(() => (
      <Ctx.Provider value={{ debugging: true }}>
        <DBox id="a" debugOptions={{ debugChildren: false }}>
          <DBox id="b" debug={true}>
            <DBox id="c" />
          </DBox>
        </DBox>
      </Ctx.Provider>
    ));

    steps.whenTheAppRenders();

    steps.thenBox("a").hasDebugTurnedOn();
    steps.thenBox("b").hasDebugTurnedOn();
    steps.thenBox("c").hasDebugTurnedOff();
    steps.thenTheSnapshotMatches();
  });

  it("Debugging disabled by context overrides context options.", () => {
    const Ctx = createDebugContext(true);
    const DBox = withDebugProps(Box, Ctx);

    steps.givenTheTree(() => (
      <Ctx.Provider
        value={{ debugging: false, options: { debugChildren: true } }}
      >
        <DBox id="a">
          <DBox id="b">
            <DBox id="c" />
          </DBox>
        </DBox>
      </Ctx.Provider>
    ));

    steps.whenTheAppRenders();

    steps.thenBox("a").hasDebugTurnedOff();
    steps.thenBox("b").hasDebugTurnedOff();
    steps.thenBox("c").hasDebugTurnedOff();
    steps.thenTheSnapshotMatches();
  });

  // TODO: There is a conflict in requirements between this test and
  // "Debugging disabled by context overrides context options." need
  // to think through the expected behavior.
  it("Debugging enabled by context overrides context options.", () => {
    const Ctx = createDebugContext(true);
    const DBox = withDebugProps(Box, Ctx);

    steps.givenTheTree(() => (
      <Ctx.Provider
        value={{ debugging: true, options: { debugChildren: false } }}
      >
        <DBox id="a">
          <DBox id="b">
            <DBox id="c" />
          </DBox>
        </DBox>
      </Ctx.Provider>
    ));

    steps.whenTheAppRenders();

    steps.thenBox("a").hasDebugTurnedOn();
    steps.thenBox("b").hasDebugTurnedOn();
    steps.thenBox("c").hasDebugTurnedOn();
    steps.thenTheSnapshotMatches();
  });
});
