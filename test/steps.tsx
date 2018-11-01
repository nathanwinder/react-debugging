import { mount, ReactWrapper } from "enzyme";
import { configure } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { createDebugContext, withDebugProps } from "../src/index";

configure({ adapter: new Adapter() });

export interface DebugOptions {
  box?: {
    color?: string;
    style?: string | undefined;
  };
}

const Box = (props: {
  id: string;
  debug?: boolean | { color: string; style: string };
  children?: any;
}) => (
  <div
    id={props.id}
    className={[
      props.debug ? "debug" : "",
      typeof props.debug === "object" && props.debug.color
        ? props.debug.color
        : "",
      typeof props.debug === "object" && props.debug.style
        ? props.debug.style
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
  private contextOptions: DebugOptions | undefined = {
    box: {
      color: "red",
      style: undefined
    }
  };

  public givenTheContextDebuggingIsOn() {
    this.debugging = true;
    this.createContext();
  }
  public givenTheContextDebuggingIsOff() {
    this.debugging = false;
    this.createContext();
  }
  public givenTheContextColorIs(color: string) {
    this.contextOptions = this.contextOptions || {};
    this.contextOptions.box = this.contextOptions.box || {};
    this.contextOptions.box.color = color;
    this.createContext();
  }
  public givenTheContextStyleIs(style: string) {
    this.contextOptions = this.contextOptions || {};
    this.contextOptions.box = this.contextOptions.box || {};
    this.contextOptions.box.style = style;
    this.createContext();
  }
  public givenTheContextOptionsAre(options: DebugOptions | undefined) {
    this.contextOptions = options;
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
      },
      hasStyle: (style: string) => {
        if (this.wrapper) {
          expect(this.wrapper.find(`div#${id}`).hasClass(style)).toBe(true);
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
    this.Ctx = createDebugContext<DebugOptions>(
      this.debugging,
      this.contextOptions
    );
    this.Box = withDebugProps(Box, this.Ctx, "box");
  }
}
