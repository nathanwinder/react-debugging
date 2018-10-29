# @winderful/react-debugging

[![Build Status](https://travis-ci.org/nathanwinder/react-debugging.svg?branch=master)](https://travis-ci.org/nathanwinder/react-debugging)

Simple TypeScript Context and HOC used for debugging. There are lots of great tools for debugging React applicaitons but when it comes to debugging layouts the classic "debug border color" is hard to beat. This suite makes integrating "debug" capabilities into your components a breeze.

## Installation (_NPM Comming Soon_)

```
npm install github:nathanwinder/react-debugging
```

```
yarn add github:nathanwinder/react-debugging
```

## Features

- Create a debug context and use the consumer to check debug status.

```typescript
import { createDebugContext } from "@winderful/react-debugging";

const DebugContext = createDebugContext(true);
```

```html
const App = ()=> (
    <DebugContext.Provider value={{ debugging: true }} />
        <DebugContext.Consumer>{c => (
            <div style={{
                border: "solid 1px",
                borderColor: c.debugging
                    ? "red"
                    : "transparent"
            }}/>
        )}</DebugContext.Consumer>
    <DebugContext.Provider value={{}} />
)
```

- "Inline" debug properties so that you can enable/disable debugging scopes without using the Context directly.

```typescript
import { createDebugContext, withDebugProps } from "@winderful/react-debugging";

const DebugContext = createDebugContext(true);
const Box = (props: {
    size: number,
    debug?: boolean,
    debugOptions: any,
    children?: any }) => <div style={{
        border: "solid 1px",
        borderColor: props.debug? "red" : "transparent"
        width: props.size,
        height: props.size,
    }} />

const DBox = withDebugProps(Box, DebugContext);
```

```html
const App = ()=> (
    // debugging enabled for this and children
    <DBox debug={true} debugOptions={{ debugChildren: true }}>
        // debugging disabled
        <DBox debug={false}>
            // debugging enabled
            <DBox/>
        </DBox>
    <DBox>
)
```

- Turn off all debugging regardless of context/component settings

```typescript
const DebugContext = createDebugContext(false);
```

- Custom debug options

```typescript
const DebugContext = createDebugContext(true, {
  color: "red"
});
```

- (_Coming Soon_) "Namespaced" debug options enable the same context to be used for a variety of components that may need different debug options.

```typescript
const DebugContext = createDebugContext(true, {
  box: {
    color: "red"
  }
});

const DBox = withDebugProps(Box, DebugContext, "box");
```

```html
const App = ()=> (
    <DBox debug={true} debugOptions={{ color: "blue" }}>
        <DBox/>
    <DBox>
)
```
