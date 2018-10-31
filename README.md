# @winderful/react-debugging

[![Build Status](https://travis-ci.com/nathanwinder/react-debugging.svg?branch=master)](https://travis-ci.com/nathanwinder/react-debugging)
[![Coverage Status](https://coveralls.io/repos/github/nathanwinder/react-debugging/badge.svg?branch=master)](https://coveralls.io/github/nathanwinder/react-debugging?branch=master)

Simple TypeScript Context and HOC used for debugging. There are lots of great tools for debugging React applications but when it comes to debugging layouts the classic "debug border color" is hard to beat. This suite makes integrating "debug" capabilities into your components a breeze.

## Installation (_NPM Coming Soon_)

This library utilizes symantec versioning but is still in alpha development. Its a good idea to "save exact" to prevent any unexpected updates.

```
npm install github:nathanwinder/react-debugging --save-exact
```

```
yarn add github:nathanwinder/react-debugging --exact
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

Box.WithDebug = withDebugProps(Box, DebugContext);
```

```html
const App = ()=> (
    // debugging enabled for this and children
    <Box.WithDebug debug={true} debugOptions={{ debugChildren: true }}>
        // debugging disabled
        <Box.WithDebug debug={false}>
            // debugging enabled
            <Box.WithDebug/>
        </Box.WithDebug>
    <Box.WithDebug>
)
```

- Custom debug options

```typescript
const DebugContext = createDebugContext(true, {
  color: "red"
});
```

- "Namespaced" debug options enable the same context to be used for a variety of components that may need different debug options.

```typescript
const DebugContext = createDebugContext(true, {
  box: {
    color: "red"
  }
});

const Box.WithDebug = withDebugProps(Box, DebugContext, "box");
```

```html
const App = ()=> (
    <Box.WithDebug debug={true} debugOptions={{ color: "blue" }}>
        <Box.WithDebug/>
    <Box.WithDebug>
)
```

- For the best possible performance remove the `.WithDebug` HOC from components when not in use. In the future we'd like to provide a production build process that removes all `.WithDebug` HOCs for you.
