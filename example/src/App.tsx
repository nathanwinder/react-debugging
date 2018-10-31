import { createDebugContext, withDebugProps } from "@winderful/react-debugging";
import * as React from "react";
import "./App.css";

import logo from "./logo.svg";

interface IDebugOptions {
  box?: {
    color?: string;
  };
}
const DebugContext = createDebugContext<IDebugOptions>(false, {
  box: {
    color: "blue"
  }
});

const Box = (props: {
  children?: any;
  size?: number;
  debug?: boolean | { color?: string };
}) => (
  <div
    style={{
      width: props.size || 100,
      height: props.size || 100,
      backgroundColor: "lightgray",
      border: "solid",
      borderWidth: 1,
      borderColor: props.debug
        ? typeof props.debug === "boolean"
          ? "red"
          : props.debug.color || "red"
        : "transparent"
    }}
  >
    {props.children || null}
  </div>
);
Box.WithDebug = withDebugProps(Box, DebugContext, "box");

class App extends React.Component {
  public render() {
    return (
      <DebugContext.Provider value={{ debug: false }}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
          </p>
          <Box.WithDebug size={300} debug={true}>
            <Box.WithDebug size={250} debugDescendants={true}>
              <Box.WithDebug size={200}>
                <Box.WithDebug size={150} debug={{ color: "green" }} />
              </Box.WithDebug>
            </Box.WithDebug>
          </Box.WithDebug>
        </div>
      </DebugContext.Provider>
    );
  }
}

export default App;
