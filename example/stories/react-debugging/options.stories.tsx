import * as React from "react";

// import { action } from "@storybook/addon-actions";
// import { linkTo } from "@storybook/addon-links";
import { storiesOf } from "@storybook/react";
import { createDebugContext, withDebugProps } from "@winderful/react-debugging";
import { BoxBase, colors, IBoxDebugOptions, styles } from "../../src/Box/index";

interface IDebugOptions {
  // box is the "namespace" for Box
  // components options
  box?: {
    color?: colors;
    style?: styles;
  };
  circle?: {
    color?: colors;
  };
}

function getDebugColor(debug: boolean | IBoxDebugOptions | undefined): colors {
  return debug === false
    ? "transparent"
    : debug === true
      ? "black"
      : debug
        ? debug.color
          ? debug.color
          : "black"
        : "transparent";
}

function getEnhancedBox(options: { debugOn: boolean; options: IDebugOptions }) {
  const DebugContext = createDebugContext<IDebugOptions>(
    options.debugOn,
    options.options
  );

  // add a debug prop to your component
  const Box = (props: {
    debug?: boolean | IBoxDebugOptions;
    color: colors;
    children?: any;
  }) => (
    <BoxBase
      color={props.color}
      style={typeof props.debug === "object" ? props.debug.style : undefined}
      borderColor={getDebugColor(props.debug)}
    >
      {props.children}
    </BoxBase>
  );

  // use the "withDebugProps" HOC to wrap your component
  Box.WithDebug = withDebugProps(Box, DebugContext, "box");

  return { DebugContext, Box };
}

storiesOf("react-debugging/options", module)
  .add("Add debug options to a component", () => {
    // define the type of your debug options
    // for this context.
    interface IOptions {
      // box is the "namespace" for Box
      // components options
      box?: {
        color?: colors;
      };
    }

    // include options when creating the context.
    // Make sure to include the generic parameter
    // or the typing will not work correctly.
    const DebugContext = createDebugContext<IOptions>(true, {
      box: { color: "red" }
    });

    // update the debug prop to accept the
    // debug options for the Box
    const Box = (props: {
      debug?: boolean | { color?: colors };
      color: colors;
      children?: any;
    }) => (
      <BoxBase color={props.color} borderColor={getDebugColor(props.debug)}>
        {props.children}
      </BoxBase>
    );

    // include the options "namespace" (box) for
    // your component when wrapping in the HOC.
    Box.WithDebug = withDebugProps(Box, DebugContext, "box");

    // debugging is inherited from the context (border)
    return <Box.WithDebug color="red" />;
  })

  .add("Set options for component", () => {
    const { Box } = getEnhancedBox({
      debugOn: true,
      options: { box: { color: "black" } }
    });

    return (
      // set the options using the debug property
      <Box.WithDebug color="red" debug={{ color: "blue" }}>
        <Box.WithDebug color="blue">
          <Box.WithDebug color="green" />
        </Box.WithDebug>
      </Box.WithDebug>
    );
  })

  .add("Set options for a tree using a component", () => {
    const { Box } = getEnhancedBox({
      debugOn: true,
      options: { box: { color: "black" } }
    });

    return (
      // set the options using the debug property
      <Box.WithDebug color="red" debug={{ color: "blue" }} debugScope={true}>
        <Box.WithDebug color="blue">
          <Box.WithDebug color="green" />
        </Box.WithDebug>
      </Box.WithDebug>
    );
  })
  .add("Set options for a tree using Scope", () => {
    const { DebugContext, Box } = getEnhancedBox({
      debugOn: true,
      options: { box: { color: "black" } }
    });

    return (
      <Box.WithDebug color="red">
        {/* set the options using the debug property */}
        <DebugContext.Scope debug={{ box: { color: "blue" } }}>
          <Box.WithDebug color="blue">
            <Box.WithDebug color="green" />
          </Box.WithDebug>
        </DebugContext.Scope>
      </Box.WithDebug>
    );
  })
  .add("Options set for component override inherited options", () => {
    const { Box } = getEnhancedBox({
      debugOn: true,
      options: { box: { color: "red" } }
    });

    return (
      <Box.WithDebug color="red" debug={{ color: "blue" }} debugScope={true}>
        <Box.WithDebug color="blue">
          {/* Override value inherited from red */}
          <Box.WithDebug color="green" debug={{ color: "green" }} />
        </Box.WithDebug>
      </Box.WithDebug>
    );
  })

  .add("Options are shallow merged", () => {
    const { Box } = getEnhancedBox({
      debugOn: true,
      options: { box: { color: "red", style: "dashed" } }
    });

    return (
      // overrides color and style for descendants
      <Box.WithDebug color="red" debug={{ style: "solid" }} debugScope={true}>
        {/* Overrides color for descendant but does not override style */}
        <Box.WithDebug
          color="blue"
          debug={{ color: "green" }}
          debugScope={true}
        >
          <Box.WithDebug color="green" />
        </Box.WithDebug>
      </Box.WithDebug>
    );
  })

  .add("Provider inherits options from parent context", () => {
    const { DebugContext, Box } = getEnhancedBox({
      debugOn: true,
      options: { box: { color: "black", style: "solid" } }
    });

    return (
      <DebugContext.Scope debug={{ box: { color: "red" } }}>
        <Box.WithDebug color="red">
          <DebugContext.Scope debug={{ box: { style: "dashed" } }}>
            <Box.WithDebug color="blue">
              <Box.WithDebug color="green" />
            </Box.WithDebug>
          </DebugContext.Scope>
        </Box.WithDebug>
      </DebugContext.Scope>
    );
  });
