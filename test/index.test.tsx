import * as React from "react";
import * as steps from "./steps";

describe("Debug context status:", () => {
  let Steps: steps.Steps = new steps.Steps();
  beforeEach(() => {
    Steps = new steps.Steps();
  });

  it("Context debugging is on", () => {
    Steps.givenTheContextDebuggingIsOn();
    Steps.givenTheTree(() => (
      <Steps.Box id="a">
        <Steps.Box id="b">
          <Steps.Box id="c" />
        </Steps.Box>
      </Steps.Box>
    ));

    Steps.whenTheAppRenders();

    Steps.thenBox("a").hasDebugTurnedOn();
    Steps.thenBox("b").hasDebugTurnedOn();
    Steps.thenBox("c").hasDebugTurnedOn();
    Steps.thenTheSnapshotMatches();
  });

  it("Context debugging is off", () => {
    Steps.givenTheContextDebuggingIsOff();
    Steps.givenTheTree(() => (
      <Steps.Box id="a">
        <Steps.Box id="b">
          <Steps.Box id="c" />
        </Steps.Box>
      </Steps.Box>
    ));

    Steps.whenTheAppRenders();

    Steps.thenBox("a").hasDebugTurnedOff();
    Steps.thenBox("b").hasDebugTurnedOff();
    Steps.thenBox("c").hasDebugTurnedOff();
    Steps.thenTheSnapshotMatches();
  });

  it("Component turns off debugging", () => {
    Steps.givenTheContextDebuggingIsOn();
    Steps.givenTheTree(() => (
      <Steps.Box id="a">
        <Steps.Box id="b" debug={false}>
          <Steps.Box id="c" />
        </Steps.Box>
      </Steps.Box>
    ));

    Steps.whenTheAppRenders();

    Steps.thenBox("a").hasDebugTurnedOn();
    Steps.thenBox("b").hasDebugTurnedOff();
    Steps.thenBox("c").hasDebugTurnedOn();
    Steps.thenTheSnapshotMatches();
  });

  it("Component turns on debugging", () => {
    Steps.givenTheContextDebuggingIsOff();
    Steps.givenTheTree(() => (
      <Steps.Box id="a">
        <Steps.Box id="b" debug={true}>
          <Steps.Box id="c" />
        </Steps.Box>
      </Steps.Box>
    ));

    Steps.whenTheAppRenders();

    Steps.thenBox("a").hasDebugTurnedOff();
    Steps.thenBox("b").hasDebugTurnedOn();
    Steps.thenBox("c").hasDebugTurnedOff();
    Steps.thenTheSnapshotMatches();
  });

  it("Provider turns on debugging", () => {
    Steps.givenTheContextDebuggingIsOff();
    Steps.givenTheTree(() => (
      <Steps.Box id="a">
        <Steps.Ctx.Scope debug={true}>
          <Steps.Box id="b">
            <Steps.Box id="c" />
          </Steps.Box>
        </Steps.Ctx.Scope>
      </Steps.Box>
    ));

    Steps.whenTheAppRenders();

    Steps.thenBox("a").hasDebugTurnedOff();
    Steps.thenBox("b").hasDebugTurnedOn();
    Steps.thenBox("c").hasDebugTurnedOn();
    Steps.thenTheSnapshotMatches();
  });

  it("Provider turns debugging on", () => {
    Steps.givenTheContextDebuggingIsOff();
    Steps.givenTheTree(() => (
      <Steps.Box id="a">
        <Steps.Ctx.Scope debug={true}>
          <Steps.Box id="b">
            <Steps.Box id="c" />
          </Steps.Box>
        </Steps.Ctx.Scope>
      </Steps.Box>
    ));

    Steps.whenTheAppRenders();

    Steps.thenBox("a").hasDebugTurnedOff();
    Steps.thenBox("b").hasDebugTurnedOn();
    Steps.thenBox("c").hasDebugTurnedOn();
    Steps.thenTheSnapshotMatches();
  });

  it("Provider turns debugging off", () => {
    Steps.givenTheContextDebuggingIsOn();
    Steps.givenTheTree(() => (
      <Steps.Box id="a">
        <Steps.Ctx.Scope debug={false}>
          <Steps.Box id="b">
            <Steps.Box id="c" />
          </Steps.Box>
        </Steps.Ctx.Scope>
      </Steps.Box>
    ));

    Steps.whenTheAppRenders();

    Steps.thenBox("a").hasDebugTurnedOn();
    Steps.thenBox("b").hasDebugTurnedOff();
    Steps.thenBox("c").hasDebugTurnedOff();
    Steps.thenTheSnapshotMatches();
  });

  it("Nested providers", () => {
    Steps.givenTheContextDebuggingIsOn();
    Steps.givenTheTree(() => (
      <Steps.Box id="a">
        <Steps.Ctx.Scope debug={false}>
          <Steps.Box id="b">
            <Steps.Ctx.Scope debug={true}>
              <Steps.Box id="c" />
            </Steps.Ctx.Scope>
          </Steps.Box>
        </Steps.Ctx.Scope>
      </Steps.Box>
    ));

    Steps.whenTheAppRenders();

    Steps.thenBox("a").hasDebugTurnedOn();
    Steps.thenBox("b").hasDebugTurnedOff();
    Steps.thenBox("c").hasDebugTurnedOn();
    Steps.thenTheSnapshotMatches();
  });
});

describe("Component status:", () => {
  let Steps: steps.Steps = new steps.Steps();
  beforeEach(() => {
    Steps = new steps.Steps();
  });

  it("Component turns descendant debugging off", () => {
    Steps.givenTheContextDebuggingIsOn();
    Steps.givenTheTree(() => (
      <Steps.Box id="a" debug={false} debugScope={true}>
        <Steps.Box id="b">
          <Steps.Box id="c" />
        </Steps.Box>
      </Steps.Box>
    ));

    Steps.whenTheAppRenders();

    Steps.thenBox("a").hasDebugTurnedOff();
    Steps.thenBox("b").hasDebugTurnedOff();
    Steps.thenBox("c").hasDebugTurnedOff();
    Steps.thenTheSnapshotMatches();
  });

  it("Component turns descendant debugging on", () => {
    Steps.givenTheContextDebuggingIsOff();
    Steps.givenTheTree(() => (
      <Steps.Box id="a" debug={true} debugScope={true}>
        <Steps.Box id="b">
          <Steps.Box id="c" />
        </Steps.Box>
      </Steps.Box>
    ));

    Steps.whenTheAppRenders();

    Steps.thenBox("a").hasDebugTurnedOn();
    Steps.thenBox("b").hasDebugTurnedOn();
    Steps.thenBox("c").hasDebugTurnedOn();
    Steps.thenTheSnapshotMatches();
  });

  it("Descendant turns debugging off", () => {
    Steps.givenTheContextDebuggingIsOff();
    Steps.givenTheTree(() => (
      <Steps.Box id="a" debug={true} debugScope={true}>
        <Steps.Box id="b" debug={false}>
          <Steps.Box id="c" />
        </Steps.Box>
      </Steps.Box>
    ));

    Steps.whenTheAppRenders();

    Steps.thenBox("a").hasDebugTurnedOn();
    Steps.thenBox("b").hasDebugTurnedOff();
    Steps.thenBox("c").hasDebugTurnedOn();
    Steps.thenTheSnapshotMatches();
  });

  it("Descendant turns debugging on", () => {
    Steps.givenTheContextDebuggingIsOn();
    Steps.givenTheTree(() => (
      <Steps.Box id="a" debug={false} debugScope={true}>
        <Steps.Box id="b" debug={true}>
          <Steps.Box id="c" />
        </Steps.Box>
      </Steps.Box>
    ));

    Steps.whenTheAppRenders();

    Steps.thenBox("a").hasDebugTurnedOff();
    Steps.thenBox("b").hasDebugTurnedOn();
    Steps.thenBox("c").hasDebugTurnedOff();
    Steps.thenTheSnapshotMatches();
  });
});

describe("Debug options", () => {
  let Steps: steps.Steps = new steps.Steps();
  beforeEach(() => {
    Steps = new steps.Steps();
  });

  it("Options are inherited from context", () => {
    Steps.givenTheContextDebuggingIsOn();
    Steps.givenTheTree(() => (
      <Steps.Box id="a">
        <Steps.Box id="b">
          <Steps.Box id="c" />
        </Steps.Box>
      </Steps.Box>
    ));

    Steps.whenTheAppRenders();

    Steps.thenBox("a").hasColor("red");
    Steps.thenBox("b").hasColor("red");
    Steps.thenBox("c").hasColor("red");
    Steps.thenTheSnapshotMatches();
  });

  it("Shallow copy component option over context option", () => {
    Steps.givenTheContextDebuggingIsOn();
    Steps.givenTheContextColorIs("red");
    Steps.givenTheTree(() => (
      <Steps.Box id="a">
        <Steps.Box id="b" debug={{ color: "green" }}>
          <Steps.Box id="c" />
        </Steps.Box>
      </Steps.Box>
    ));

    Steps.whenTheAppRenders();

    Steps.thenBox("a").hasColor("red");
    Steps.thenBox("b").hasColor("green");
    Steps.thenBox("c").hasColor("red");
    Steps.thenTheSnapshotMatches();
  });

  it("Shallow copy descendant option over context options", () => {
    Steps.givenTheContextDebuggingIsOn();
    Steps.givenTheContextColorIs("red");

    Steps.givenTheTree(() => (
      <Steps.Box id="a">
        <Steps.Box id="b" debug={{ color: "green" }} debugScope={true}>
          <Steps.Box id="c" />
        </Steps.Box>
      </Steps.Box>
    ));

    Steps.whenTheAppRenders();

    Steps.thenBox("a").hasColor("red");
    Steps.thenBox("b").hasColor("green");
    Steps.thenBox("c").hasColor("green");
    Steps.thenTheSnapshotMatches();
  });

  it("Scope allows unaltered context options to pass through", () => {
    Steps.givenTheContextDebuggingIsOn();
    Steps.givenTheContextColorIs("red");

    Steps.givenTheTree(() => (
      <Steps.Box id="a">
        <Steps.Ctx.Scope debug={true}>
          <Steps.Box id="b">
            <Steps.Box id="c" />
          </Steps.Box>
        </Steps.Ctx.Scope>
      </Steps.Box>
    ));

    Steps.whenTheAppRenders();

    Steps.thenBox("a").hasColor("red");
    Steps.thenBox("b").hasColor("red");
    Steps.thenBox("c").hasColor("red");
    Steps.thenTheSnapshotMatches();
  });

  it("Scope merges options with parent context", () => {
    Steps.givenTheContextDebuggingIsOn();
    Steps.givenTheContextColorIs("black");
    Steps.givenTheContextStyleIs("dash");

    Steps.givenTheTree(() => (
      <Steps.Box id="a">
        <Steps.Ctx.Scope debug={{ box: { color: "red" } }}>
          <Steps.Box id="b">
            <Steps.Box id="c" />
          </Steps.Box>
        </Steps.Ctx.Scope>
      </Steps.Box>
    ));

    Steps.whenTheAppRenders();

    Steps.thenBox("a").hasColor("black");
    Steps.thenBox("a").hasStyle("dash");
    Steps.thenBox("b").hasColor("red");
    Steps.thenBox("b").hasStyle("dash");
    Steps.thenBox("c").hasColor("red");
    Steps.thenBox("c").hasStyle("dash");
    Steps.thenTheSnapshotMatches();
  });

  it("Scope merges options down tree", () => {
    Steps.givenTheContextDebuggingIsOn();
    Steps.givenTheContextColorIs("black");
    Steps.givenTheContextStyleIs("dash");

    Steps.givenTheTree(() => (
      <Steps.Box id="a">
        <Steps.Ctx.Scope debug={{ box: { color: "red" } }}>
          <Steps.Box id="b">
            <Steps.Ctx.Scope debug={{ box: { style: "dot" } }}>
              <Steps.Box id="c" />
            </Steps.Ctx.Scope>
          </Steps.Box>
        </Steps.Ctx.Scope>
      </Steps.Box>
    ));

    Steps.whenTheAppRenders();

    Steps.thenBox("a").hasColor("black");
    Steps.thenBox("a").hasStyle("dash");
    Steps.thenBox("b").hasColor("red");
    Steps.thenBox("b").hasStyle("dash");
    Steps.thenBox("c").hasColor("red");
    Steps.thenBox("c").hasStyle("dot");
    Steps.thenTheSnapshotMatches();
  });

  it("Scoped component merges options down tree", () => {
    Steps.givenTheContextDebuggingIsOn();
    Steps.givenTheContextColorIs("black");
    Steps.givenTheContextStyleIs("dash");

    Steps.givenTheTree(() => (
      <Steps.Box id="a" debug={{ color: "red" }} debugScope={true}>
        <Steps.Box id="b" debug={{ style: "dot" }} debugScope={true}>
          <Steps.Box id="c" />
        </Steps.Box>
      </Steps.Box>
    ));

    Steps.whenTheAppRenders();

    Steps.thenBox("a").hasColor("red");
    Steps.thenBox("a").hasStyle("dash");
    Steps.thenBox("b").hasColor("red");
    Steps.thenBox("b").hasStyle("dot");
    Steps.thenBox("c").hasColor("red");
    Steps.thenBox("c").hasStyle("dot");
    Steps.thenTheSnapshotMatches();
  });

  it("Setting debug without context options.", () => {
    Steps.givenTheContextDebuggingIsOff();
    Steps.givenTheContextOptionsAre(undefined);

    Steps.givenTheTree(() => (
      <Steps.Box id="a">
        <Steps.Box id="b" debug={true}>
          <Steps.Box id="c" />
        </Steps.Box>
      </Steps.Box>
    ));

    Steps.whenTheAppRenders();

    Steps.thenBox("a").hasDebugTurnedOff();
    Steps.thenBox("b").hasDebugTurnedOn();
    Steps.thenBox("c").hasDebugTurnedOff();
    Steps.thenTheSnapshotMatches();
  });

  it("Setting scope without context options.", () => {
    Steps.givenTheContextDebuggingIsOff();
    Steps.givenTheContextOptionsAre(undefined);

    Steps.givenTheTree(() => (
      <Steps.Box id="a">
        <Steps.Ctx.Scope debug={true}>
          <Steps.Box id="b">
            <Steps.Box id="c" />
          </Steps.Box>
        </Steps.Ctx.Scope>
      </Steps.Box>
    ));

    Steps.whenTheAppRenders();

    Steps.thenBox("a").hasDebugTurnedOff();
    Steps.thenBox("b").hasDebugTurnedOn();
    Steps.thenBox("c").hasDebugTurnedOn();
    Steps.thenTheSnapshotMatches();
  });

  it("Setting scope options without context options.", () => {
    Steps.givenTheContextDebuggingIsOff();
    Steps.givenTheContextOptionsAre(undefined);

    Steps.givenTheTree(() => (
      <Steps.Box id="a">
        <Steps.Ctx.Scope debug={{ box: { color: "red" } }}>
          <Steps.Box id="b">
            <Steps.Box id="c" />
          </Steps.Box>
        </Steps.Ctx.Scope>
      </Steps.Box>
    ));

    Steps.whenTheAppRenders();

    Steps.thenBox("a").hasDebugTurnedOff();
    Steps.thenBox("b").hasDebugTurnedOn();
    Steps.thenBox("b").hasColor("red");
    Steps.thenBox("c").hasDebugTurnedOn();
    Steps.thenBox("b").hasColor("red");
    Steps.thenTheSnapshotMatches();
  });
});
