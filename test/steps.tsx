import { mount, ReactWrapper } from "enzyme";
import { configure } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { createDebugContext, withDebugProps } from "../src";

configure({ adapter: new Adapter() });

export interface DebugOptions {
  box?: {
    color?: string;
  };
}

const Box = (props: {
  id: string;
  debug?: boolean | { color: string };
  children?: any;
}) => (
  <div
    id={props.id}
    className={[
      props.debug ? "debug" : "",
      typeof props.debug === "object" && props.debug.color
        ? props.debug.color
        : ""
    ].join(" ")}
  >
    {props.children || null}
  </div>
);

export class Steps {
  public Ctx = createDebugContext<DebugOptions>(false, {
    box: {
      color: "red"
    }
  });
  public Box = withDebugProps(Box, this.Ctx, "box");
  private tree: React.ComponentType<any> | null = null;
  private wrapper: ReactWrapper | null = null;
  private debugging: boolean = false;
  private contextColor: string = "red";

  public givenTheContextDebuggingIsOn() {
    this.debugging = true;
    this.createContext();
  }
  public givenTheContextDebuggingIsOff() {
    this.debugging = false;
    this.createContext();
  }
  public givenTheContextColorIs(color: string) {
    this.contextColor = color;
    this.createContext();
  }

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
      },
      hasColor: (color: string) => {
        if (this.wrapper) {
          expect(this.wrapper.find(`div#${id}`).hasClass(color)).toBe(true);
        } else {
          expect(this.wrapper).toBeDefined();
        }
      }
    };
  }
  public thenTheSnapshotMatches() {
    expect(this.wrapper).toMatchSnapshot();
  }

  private createContext() {
    this.Ctx = createDebugContext<DebugOptions>(this.debugging, {
      box: {
        color: this.contextColor
      }
    });
    this.Box = withDebugProps(Box, this.Ctx, "box");
  }
}
