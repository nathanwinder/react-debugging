import * as React from "react";

// import { action } from "@storybook/addon-actions";
// import { linkTo } from "@storybook/addon-links";
import { storiesOf } from "@storybook/react";
import { createDebugContext, withDebugProps } from "@winderful/react-debugging";
import { BoxBase, colors } from "../../src/Box/index";

function getDebugColor(debug: boolean | undefined): colors {
  return debug === true ? "black" : "transparent";
}

function getEnhancedBox(options: { debugOn: boolean }) {
  const DebugContext = createDebugContext(options.debugOn);

  // add a debug prop to your component
  const Box = (props: { debug?: boolean; color: colors; children?: any }) => (
    <BoxBase color={props.color} borderColor={getDebugColor(props.debug)}>
      {props.children}
    </BoxBase>
  );

  // use the "withDebugProps" HOC to wrap your component
  Box.WithDebug = withDebugProps(Box, DebugContext);

  return { DebugContext, Box };
}

storiesOf("react-debugging/basics", module)
  .add("Add debugging to a component", () => {
    // create a debug context with debugging turned on by default
    const DebugContext = createDebugContext(true);

    // add a debug prop to your component
    const Box = (props: { debug?: boolean; color: colors; children?: any }) => (
      <BoxBase color={props.color} borderColor={getDebugColor(props.debug)}>
        {props.children}
      </BoxBase>
    );

    // use the "withDebugProps" HOC to wrap your component
    Box.WithDebug = withDebugProps(Box, DebugContext);

    // debugging is inherited from the context (border)
    return <Box.WithDebug color="red" />;
  })

  .add("Use the debugging context consumer directly", () => {
    const { DebugContext } = getEnhancedBox({ debugOn: true });

    return (
      <DebugContext.Consumer>
        {c => (
          <BoxBase
            color="red"
            borderColor={c.debug ? "black" : "transparent"}
          />
        )}
      </DebugContext.Consumer>
    );
  })

  .add("Turn on debugging from the context", () => {
    // create a Box enhanced by a context that has
    // debugging turned on by default
    const { Box } = getEnhancedBox({ debugOn: true });

    return (
      /* debug is inherited */
      <Box.WithDebug color="red">
        {/* debug is inherited */}
        <Box.WithDebug color="blue">
          {/* not using HOC, debug is not inherited */}
          <Box color="green" />
        </Box.WithDebug>
      </Box.WithDebug>
    );
  })

  .add("Turn off debugging for a component", () => {
    const { Box } = getEnhancedBox({ debugOn: true });

    return (
      <Box.WithDebug color="red">
        {/* turn debugging off*/}
        <Box.WithDebug color="blue" debug={false}>
          <Box.WithDebug color="green" />
        </Box.WithDebug>
      </Box.WithDebug>
    );
  })

  .add("Turn on debugging for a component", () => {
    const { Box } = getEnhancedBox({ debugOn: false });

    return (
      <Box.WithDebug color="red">
        {/* turn debugging on */}
        <Box.WithDebug color="blue" debug={true}>
          <Box.WithDebug color="green" />
        </Box.WithDebug>
      </Box.WithDebug>
    );
  })

  .add("Turn on debugging for a tree using a component", () => {
    const { Box } = getEnhancedBox({ debugOn: false });

    return (
      /* enabled debugging for descendants*/
      <Box.WithDebug color="red">
        <Box.WithDebug color="blue" debug={true} debugScope={true}>
          <Box.WithDebug color="green" />
        </Box.WithDebug>
      </Box.WithDebug>
    );
  })

  .add("Turn off debugging for a tree using a component", () => {
    const { Box } = getEnhancedBox({ debugOn: true });

    return (
      /* enabled debugging for descendants*/
      <Box.WithDebug color="red">
        <Box.WithDebug color="blue" debug={false} debugScope={true}>
          <Box.WithDebug color="green" />
        </Box.WithDebug>
      </Box.WithDebug>
    );
  })

  .add("Turn on debugging for a tree using Scope", () => {
    const { DebugContext, Box } = getEnhancedBox({ debugOn: false });

    return (
      <Box.WithDebug color="red">
        {/* enabled debugging for descendants*/}
        <DebugContext.Scope debug={true}>
          <Box.WithDebug color="blue">
            <Box.WithDebug color="green" />
          </Box.WithDebug>
        </DebugContext.Scope>
      </Box.WithDebug>
    );
  })

  .add("Turn off debugging for a tree using the Scope", () => {
    const { DebugContext, Box } = getEnhancedBox({ debugOn: true });

    return (
      <Box.WithDebug color="red">
        {/* disable debugging for descendants*/}
        <DebugContext.Scope debug={false}>
          <Box.WithDebug color="blue">
            <Box.WithDebug color="green" />
          </Box.WithDebug>
        </DebugContext.Scope>
      </Box.WithDebug>
    );
  });
