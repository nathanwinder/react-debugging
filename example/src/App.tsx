import { createDebugContext, withDebugProps } from "@winderful/react-debugging";
import * as React from "react";
import "./App.css";

import logo from "./logo.svg";

interface IOptions {
  color: string;
}

const DebugContext = createDebugContext<IOptions>(true, {
  color: "blue"
});

const Box = (props: {
  children?: any;
  size?: number;
  debug?: boolean;
  debugOptions?: IOptions;
}) => (
  <div
    style={{
      width: props.size || 100,
      height: props.size || 100,
      backgroundColor: "lightgray",
      border: "solid",
      borderWidth: 1,
      borderColor: props.debug
        ? props.debugOptions
          ? props.debugOptions.color
          : "red"
        : "transparent"
    }}
  >
    {props.children || null}
  </div>
);

const DBox = withDebugProps(Box, DebugContext);

class App extends React.Component {
  public render() {
    return (
      <DebugContext.Provider value={{ debugging: true }}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
          </p>
          <DBox size={300} debug={false}>
            <DBox size={250}>
              <DBox size={200} debug={true}>
                <DBox size={150} />
              </DBox>
            </DBox>
          </DBox>
        </div>
      </DebugContext.Provider>
    );
  }
}

export default App;
