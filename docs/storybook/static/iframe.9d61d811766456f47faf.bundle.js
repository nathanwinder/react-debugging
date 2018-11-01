(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{443:function(e,o,r){r(172),r(444),e.exports=r(445)},445:function(e,o,r){"use strict";r.r(o),function(e){var o=r(106),n=r(458);Object(o.configure)(function(){n.keys().forEach(function(e){return n(e)})},e)}.call(this,r(147)(e))},45:function(e,o,r){"use strict";var n=r(36);function t(e,o){const r={debug:e,options:o},t=n.createContext(r),u={Provider:t.Provider,Scope:function(e){return class extends n.PureComponent{render(){return n.createElement(e.Consumer,null,o=>{let r=o.debug,t=o.options;if(this.props.debug){if(!0===this.props.debug)r=!0;else if("object"==typeof this.props.debug&&(r=!0,t=o.options?Object.assign({},o.options):{},null!=o.options))for(const e of Object.keys(this.props.debug)){const o=t[e]||{},r=this.props.debug[e];t[e]=Object.assign({},o,r)}}else r=!1;return n.createElement(e.Provider,{value:{debug:r,options:t}},this.props.children)})}}}(t),Consumer:t.Consumer,displayName:"DebugContext"};return u}function u(e,o,r){const t=o;class u extends n.Component{render(){const o=Object.assign({},this.props);return delete o.debug,delete o.debugScope,n.createElement(t.Consumer,null,u=>{const c={},g=u.options&&r&&u.options[r];if(!1===this.props.debug||(!0===this.props.debug?c.debug=g||!0:null!=this.props.debug?c.debug=Object.assign({},g,this.props.debug):u.debug&&(c.debug=g||!0)),this.props.debugScope){let g,i=u.debug;return!1===this.props.debug?(i=!1,g=u.options):this.props.debug&&(i=!0,"object"==typeof this.props.debug&&r&&(g=Object.assign({},u.options,{[r]:Object.assign({},u.options&&u.options[r],this.props.debug)}))),n.createElement(t.Provider,{value:{debug:i,options:g}},n.createElement(e,Object.assign({},o,c)))}return n.createElement(e,Object.assign({},o,c))})}}return u.displayName=`${e.displayName||e.name}.WithDebug`,u}r.d(o,"a",function(){return t}),r.d(o,"b",function(){return u})},458:function(e,o,r){var n={"./react-debugging/basics.stories.tsx":459,"./react-debugging/options.stories.tsx":462};function t(e){var o=u(e);return r(o)}function u(e){var o=n[e];if(!(o+1)){var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}return o}t.keys=function(){return Object.keys(n)},t.resolve=u,e.exports=t,t.id=458},459:function(e,o,r){"use strict";r.r(o),function(e){r.d(o,"withStorySource",function(){return g}),r.d(o,"__STORY__",function(){return i}),r.d(o,"__ADDS_MAP__",function(){return b});var n=r(0),t=r(106),u=r(45),c=r(90),g=r(152).withStorySource,i='import * as React from \'react\';\r\n\r\n// import { action } from "@storybook/addon-actions";\r\n// import { linkTo } from "@storybook/addon-links";\r\nimport { storiesOf } from \'@storybook/react\';\r\nimport { createDebugContext, withDebugProps } from \'@winderful/react-debugging\';\r\nimport { BoxBase, colors } from \'../../src/Box/index\';\r\n\r\nfunction getDebugColor(debug: boolean | undefined): colors {\r\n  return debug === true ? \'black\' : \'transparent\';\r\n}\r\n\r\nfunction getEnhancedBox(options: { debugOn: boolean }) {\r\n  const DebugContext = createDebugContext(options.debugOn);\r\n\r\n  // add a debug prop to your component\r\n  const Box = (props: { debug?: boolean; color: colors; children?: any }) => (\r\n    <BoxBase color={props.color} borderColor={getDebugColor(props.debug)}>\r\n      {props.children}\r\n    </BoxBase>\r\n  );\r\n\r\n  // use the "withDebugProps" HOC to wrap your component\r\n  Box.WithDebug = withDebugProps(Box, DebugContext);\r\n\r\n  return { DebugContext, Box };\r\n}\r\n\r\nstoriesOf(\'react-debugging/basics\', module)\r\n  .add(\'Add debugging to a component\', () => {\r\n    // create a debug context with debugging turned on by default\r\n    const DebugContext = createDebugContext(true);\r\n\r\n    // add a debug prop to your component\r\n    const Box = (props: { debug?: boolean; color: colors; children?: any }) => (\r\n      <BoxBase color={props.color} borderColor={getDebugColor(props.debug)}>\r\n        {props.children}\r\n      </BoxBase>\r\n    );\r\n\r\n    // use the "withDebugProps" HOC to wrap your component\r\n    Box.WithDebug = withDebugProps(Box, DebugContext);\r\n\r\n    // debugging is inherited from the context (border)\r\n    return <Box.WithDebug color="red" />;\r\n  })\r\n\r\n  .add(\'Use the debugging context consumer directly\', () => {\r\n    const { DebugContext } = getEnhancedBox({ debugOn: true });\r\n\r\n    return (\r\n      <DebugContext.Consumer>\r\n        {c => <BoxBase color="red" borderColor={c.debug ? \'black\' : \'transparent\'} />}\r\n      </DebugContext.Consumer>\r\n    );\r\n  })\r\n\r\n  .add(\'Turn on debugging from the context\', () => {\r\n    // create a Box enhanced by a context that has\r\n    // debugging turned on by default\r\n    const { Box } = getEnhancedBox({ debugOn: true });\r\n\r\n    return (\r\n      /* debug is inherited */\r\n      <Box.WithDebug color="red">\r\n        {/* debug is inherited */}\r\n        <Box.WithDebug color="blue">\r\n          {/* not using HOC, debug is not inherited */}\r\n          <Box color="green" />\r\n        </Box.WithDebug>\r\n      </Box.WithDebug>\r\n    );\r\n  })\r\n\r\n  .add(\'Turn off debugging for a component\', () => {\r\n    const { Box } = getEnhancedBox({ debugOn: true });\r\n\r\n    return (\r\n      <Box.WithDebug color="red">\r\n        {/* turn debugging off*/}\r\n        <Box.WithDebug color="blue" debug={false}>\r\n          <Box.WithDebug color="green" />\r\n        </Box.WithDebug>\r\n      </Box.WithDebug>\r\n    );\r\n  })\r\n\r\n  .add(\'Turn on debugging for a component\', () => {\r\n    const { Box } = getEnhancedBox({ debugOn: false });\r\n\r\n    return (\r\n      <Box.WithDebug color="red">\r\n        {/* turn debugging on */}\r\n        <Box.WithDebug color="blue" debug={true}>\r\n          <Box.WithDebug color="green" />\r\n        </Box.WithDebug>\r\n      </Box.WithDebug>\r\n    );\r\n  })\r\n\r\n  .add(\'Turn on debugging for a tree using a component\', () => {\r\n    const { Box } = getEnhancedBox({ debugOn: false });\r\n\r\n    return (\r\n      /* enabled debugging for descendants*/\r\n      <Box.WithDebug color="red">\r\n        <Box.WithDebug color="blue" debug={true} debugScope={true}>\r\n          <Box.WithDebug color="green" />\r\n        </Box.WithDebug>\r\n      </Box.WithDebug>\r\n    );\r\n  })\r\n\r\n  .add(\'Turn off debugging for a tree using a component\', () => {\r\n    const { Box } = getEnhancedBox({ debugOn: true });\r\n\r\n    return (\r\n      /* enabled debugging for descendants*/\r\n      <Box.WithDebug color="red">\r\n        <Box.WithDebug color="blue" debug={false} debugScope={true}>\r\n          <Box.WithDebug color="green" />\r\n        </Box.WithDebug>\r\n      </Box.WithDebug>\r\n    );\r\n  })\r\n\r\n  .add(\'Turn on debugging for a tree using Scope\', () => {\r\n    const { DebugContext, Box } = getEnhancedBox({ debugOn: false });\r\n\r\n    return (\r\n      <Box.WithDebug color="red">\r\n        {/* enabled debugging for descendants*/}\r\n        <DebugContext.Scope debug={true}>\r\n          <Box.WithDebug color="blue">\r\n            <Box.WithDebug color="green" />\r\n          </Box.WithDebug>\r\n        </DebugContext.Scope>\r\n      </Box.WithDebug>\r\n    );\r\n  })\r\n\r\n  .add(\'Turn off debugging for a tree using the Scope\', () => {\r\n    const { DebugContext, Box } = getEnhancedBox({ debugOn: true });\r\n\r\n    return (\r\n      <Box.WithDebug color="red">\r\n        {/* disable debugging for descendants*/}\r\n        <DebugContext.Scope debug={false}>\r\n          <Box.WithDebug color="blue">\r\n            <Box.WithDebug color="green" />\r\n          </Box.WithDebug>\r\n        </DebugContext.Scope>\r\n      </Box.WithDebug>\r\n    );\r\n  });\r\n',b={"react-debugging/basics@Turn off debugging for a tree using the Scope":{startLoc:{col:7,line:142},endLoc:{col:3,line:155}},"react-debugging/basics@Turn on debugging for a tree using Scope":{startLoc:{col:7,line:127},endLoc:{col:3,line:140}},"react-debugging/basics@Turn off debugging for a tree using a component":{startLoc:{col:7,line:114},endLoc:{col:3,line:125}},"react-debugging/basics@Turn on debugging for a tree using a component":{startLoc:{col:7,line:101},endLoc:{col:3,line:112}},"react-debugging/basics@Turn on debugging for a component":{startLoc:{col:7,line:88},endLoc:{col:3,line:99}},"react-debugging/basics@Turn off debugging for a component":{startLoc:{col:7,line:75},endLoc:{col:3,line:86}},"react-debugging/basics@Turn on debugging from the context":{startLoc:{col:7,line:58},endLoc:{col:3,line:73}},"react-debugging/basics@Use the debugging context consumer directly":{startLoc:{col:7,line:48},endLoc:{col:3,line:56}},"react-debugging/basics@Add debugging to a component":{startLoc:{col:7,line:30},endLoc:{col:3,line:46}}};function d(e){return!0===e?"black":"transparent"}function l(e){var o=Object(u.a)(e.debugOn),r=function(e){return n.createElement(c.a,{color:e.color,borderColor:d(e.debug)},e.children)};return r.WithDebug=Object(u.b)(r,o),{DebugContext:o,Box:r}}Object(t.storiesOf)("react-debugging/basics",e).addDecorator(g(i,b)).add("Add debugging to a component",function(){var e=Object(u.a)(!0),o=function(e){return n.createElement(c.a,{color:e.color,borderColor:d(e.debug)},e.children)};return o.WithDebug=Object(u.b)(o,e),n.createElement(o.WithDebug,{color:"red"})}).add("Use the debugging context consumer directly",function(){var e=l({debugOn:!0}).DebugContext;return n.createElement(e.Consumer,null,function(e){return n.createElement(c.a,{color:"red",borderColor:e.debug?"black":"transparent"})})}).add("Turn on debugging from the context",function(){var e=l({debugOn:!0}).Box;return n.createElement(e.WithDebug,{color:"red"},n.createElement(e.WithDebug,{color:"blue"},n.createElement(e,{color:"green"})))}).add("Turn off debugging for a component",function(){var e=l({debugOn:!0}).Box;return n.createElement(e.WithDebug,{color:"red"},n.createElement(e.WithDebug,{color:"blue",debug:!1},n.createElement(e.WithDebug,{color:"green"})))}).add("Turn on debugging for a component",function(){var e=l({debugOn:!1}).Box;return n.createElement(e.WithDebug,{color:"red"},n.createElement(e.WithDebug,{color:"blue",debug:!0},n.createElement(e.WithDebug,{color:"green"})))}).add("Turn on debugging for a tree using a component",function(){var e=l({debugOn:!1}).Box;return n.createElement(e.WithDebug,{color:"red"},n.createElement(e.WithDebug,{color:"blue",debug:!0,debugScope:!0},n.createElement(e.WithDebug,{color:"green"})))}).add("Turn off debugging for a tree using a component",function(){var e=l({debugOn:!0}).Box;return n.createElement(e.WithDebug,{color:"red"},n.createElement(e.WithDebug,{color:"blue",debug:!1,debugScope:!0},n.createElement(e.WithDebug,{color:"green"})))}).add("Turn on debugging for a tree using Scope",function(){var e=l({debugOn:!1}),o=e.DebugContext,r=e.Box;return n.createElement(r.WithDebug,{color:"red"},n.createElement(o.Scope,{debug:!0},n.createElement(r.WithDebug,{color:"blue"},n.createElement(r.WithDebug,{color:"green"}))))}).add("Turn off debugging for a tree using the Scope",function(){var e=l({debugOn:!0}),o=e.DebugContext,r=e.Box;return n.createElement(r.WithDebug,{color:"red"},n.createElement(o.Scope,{debug:!1},n.createElement(r.WithDebug,{color:"blue"},n.createElement(r.WithDebug,{color:"green"}))))})}.call(this,r(147)(e))},462:function(e,o,r){"use strict";r.r(o),function(e){r.d(o,"withStorySource",function(){return g}),r.d(o,"__STORY__",function(){return i}),r.d(o,"__ADDS_MAP__",function(){return b});var n=r(0),t=r(106),u=r(45),c=r(90),g=r(152).withStorySource,i="import * as React from 'react';\r\n\r\n// import { action } from \"@storybook/addon-actions\";\r\n// import { linkTo } from \"@storybook/addon-links\";\r\nimport { storiesOf } from '@storybook/react';\r\nimport { createDebugContext, withDebugProps } from '@winderful/react-debugging';\r\nimport { BoxBase, colors, IBoxDebugOptions, styles } from '../../src/Box/index';\r\n\r\ninterface IDebugOptions {\r\n  // box is the \"namespace\" for Box\r\n  // components options\r\n  box?: {\r\n    color?: colors;\r\n    style?: styles;\r\n  };\r\n  circle?: {\r\n    color?: colors;\r\n  };\r\n}\r\n\r\nfunction getDebugColor(debug: boolean | IBoxDebugOptions | undefined): colors {\r\n  return debug === false\r\n    ? 'transparent'\r\n    : debug === true\r\n      ? 'black'\r\n      : debug\r\n        ? debug.color\r\n          ? debug.color\r\n          : 'black'\r\n        : 'transparent';\r\n}\r\n\r\nfunction getEnhancedBox(options: { debugOn: boolean; options: IDebugOptions }) {\r\n  const DebugContext = createDebugContext<IDebugOptions>(options.debugOn, options.options);\r\n\r\n  // add a debug prop to your component\r\n  const Box = (props: { debug?: boolean | IBoxDebugOptions; color: colors; children?: any }) => (\r\n    <BoxBase\r\n      color={props.color}\r\n      style={typeof props.debug === 'object' ? props.debug.style : undefined}\r\n      borderColor={getDebugColor(props.debug)}\r\n    >\r\n      {props.children}\r\n    </BoxBase>\r\n  );\r\n\r\n  // use the \"withDebugProps\" HOC to wrap your component\r\n  Box.WithDebug = withDebugProps(Box, DebugContext, 'box');\r\n\r\n  return { DebugContext, Box };\r\n}\r\n\r\nstoriesOf('react-debugging/options', module)\r\n  .add('Add debug options to a component', () => {\r\n    // define the type of your debug options\r\n    // for this context.\r\n    interface IOptions {\r\n      // box is the \"namespace\" for Box\r\n      // components options\r\n      box?: {\r\n        color?: colors;\r\n      };\r\n    }\r\n\r\n    // include options when creating the context.\r\n    // Make sure to include the generic parameter\r\n    // or the typing will not work correctly.\r\n    const DebugContext = createDebugContext<IOptions>(true, {\r\n      box: { color: 'red' },\r\n    });\r\n\r\n    // update the debug prop to accept the\r\n    // debug options for the Box\r\n    const Box = (props: { debug?: boolean | { color?: colors }; color: colors; children?: any }) => (\r\n      <BoxBase color={props.color} borderColor={getDebugColor(props.debug)}>\r\n        {props.children}\r\n      </BoxBase>\r\n    );\r\n\r\n    // include the options \"namespace\" (box) for\r\n    // your component when wrapping in the HOC.\r\n    Box.WithDebug = withDebugProps(Box, DebugContext, 'box');\r\n\r\n    // debugging is inherited from the context (border)\r\n    return <Box.WithDebug color=\"red\" />;\r\n  })\r\n\r\n  .add('Set options for component', () => {\r\n    const { Box } = getEnhancedBox({\r\n      debugOn: true,\r\n      options: { box: { color: 'black' } },\r\n    });\r\n\r\n    return (\r\n      // set the options using the debug property\r\n      <Box.WithDebug color=\"red\" debug={{ color: 'blue' }}>\r\n        <Box.WithDebug color=\"blue\">\r\n          <Box.WithDebug color=\"green\" />\r\n        </Box.WithDebug>\r\n      </Box.WithDebug>\r\n    );\r\n  })\r\n\r\n  .add('Set options for a tree using a component', () => {\r\n    const { Box } = getEnhancedBox({\r\n      debugOn: true,\r\n      options: { box: { color: 'black' } },\r\n    });\r\n\r\n    return (\r\n      // set the options using the debug property\r\n      <Box.WithDebug color=\"red\" debug={{ color: 'blue' }} debugScope={true}>\r\n        <Box.WithDebug color=\"blue\">\r\n          <Box.WithDebug color=\"green\" />\r\n        </Box.WithDebug>\r\n      </Box.WithDebug>\r\n    );\r\n  })\r\n  .add('Set options for a tree using Scope', () => {\r\n    const { DebugContext, Box } = getEnhancedBox({\r\n      debugOn: true,\r\n      options: { box: { color: 'black' } },\r\n    });\r\n\r\n    return (\r\n      <Box.WithDebug color=\"red\">\r\n        {/* set the options using the debug property */}\r\n        <DebugContext.Scope debug={{ box: { color: 'blue' } }}>\r\n          <Box.WithDebug color=\"blue\">\r\n            <Box.WithDebug color=\"green\" />\r\n          </Box.WithDebug>\r\n        </DebugContext.Scope>\r\n      </Box.WithDebug>\r\n    );\r\n  })\r\n  .add('Options set for component override inherited options', () => {\r\n    const { Box } = getEnhancedBox({\r\n      debugOn: true,\r\n      options: { box: { color: 'red' } },\r\n    });\r\n\r\n    return (\r\n      <Box.WithDebug color=\"red\" debug={{ color: 'blue' }} debugScope={true}>\r\n        <Box.WithDebug color=\"blue\">\r\n          {/* Override value inherited from red */}\r\n          <Box.WithDebug color=\"green\" debug={{ color: 'green' }} />\r\n        </Box.WithDebug>\r\n      </Box.WithDebug>\r\n    );\r\n  })\r\n\r\n  .add('Options are shallow merged', () => {\r\n    const { Box } = getEnhancedBox({\r\n      debugOn: true,\r\n      options: { box: { color: 'red', style: 'dashed' } },\r\n    });\r\n\r\n    return (\r\n      // overrides color and style for descendants\r\n      <Box.WithDebug color=\"red\" debug={{ style: 'solid' }} debugScope={true}>\r\n        {/* Overrides color for descendant but does not override style */}\r\n        <Box.WithDebug color=\"blue\" debug={{ color: 'green' }} debugScope={true}>\r\n          <Box.WithDebug color=\"green\" />\r\n        </Box.WithDebug>\r\n      </Box.WithDebug>\r\n    );\r\n  })\r\n\r\n  .add('Provider inherits options from parent context', () => {\r\n    const { DebugContext, Box } = getEnhancedBox({\r\n      debugOn: true,\r\n      options: { box: { color: 'black', style: 'solid' } },\r\n    });\r\n\r\n    return (\r\n      <DebugContext.Scope debug={{ box: { color: 'red' } }}>\r\n        <Box.WithDebug color=\"red\">\r\n          <DebugContext.Scope debug={{ box: { style: 'dashed' } }}>\r\n            <Box.WithDebug color=\"blue\">\r\n              <Box.WithDebug color=\"green\" />\r\n            </Box.WithDebug>\r\n          </DebugContext.Scope>\r\n        </Box.WithDebug>\r\n      </DebugContext.Scope>\r\n    );\r\n  });\r\n",b={"react-debugging/options@Provider inherits options from parent context":{startLoc:{col:7,line:169},endLoc:{col:3,line:186}},"react-debugging/options@Options are shallow merged":{startLoc:{col:7,line:152},endLoc:{col:3,line:167}},"react-debugging/options@Options set for component override inherited options":{startLoc:{col:7,line:136},endLoc:{col:3,line:150}},"react-debugging/options@Set options for a tree using Scope":{startLoc:{col:7,line:119},endLoc:{col:3,line:135}},"react-debugging/options@Set options for a tree using a component":{startLoc:{col:7,line:104},endLoc:{col:3,line:118}},"react-debugging/options@Set options for component":{startLoc:{col:7,line:88},endLoc:{col:3,line:102}},"react-debugging/options@Add debug options to a component":{startLoc:{col:7,line:54},endLoc:{col:3,line:86}}};function d(e){return!1===e?"transparent":!0===e?"black":e?e.color?e.color:"black":"transparent"}function l(e){var o=Object(u.a)(e.debugOn,e.options),r=function(e){return n.createElement(c.a,{color:e.color,style:"object"==typeof e.debug?e.debug.style:void 0,borderColor:d(e.debug)},e.children)};return r.WithDebug=Object(u.b)(r,o,"box"),{DebugContext:o,Box:r}}Object(t.storiesOf)("react-debugging/options",e).addDecorator(g(i,b)).add("Add debug options to a component",function(){var e=Object(u.a)(!0,{box:{color:"red"}}),o=function(e){return n.createElement(c.a,{color:e.color,borderColor:d(e.debug)},e.children)};return o.WithDebug=Object(u.b)(o,e,"box"),n.createElement(o.WithDebug,{color:"red"})}).add("Set options for component",function(){var e=l({debugOn:!0,options:{box:{color:"black"}}}).Box;return n.createElement(e.WithDebug,{color:"red",debug:{color:"blue"}},n.createElement(e.WithDebug,{color:"blue"},n.createElement(e.WithDebug,{color:"green"})))}).add("Set options for a tree using a component",function(){var e=l({debugOn:!0,options:{box:{color:"black"}}}).Box;return n.createElement(e.WithDebug,{color:"red",debug:{color:"blue"},debugScope:!0},n.createElement(e.WithDebug,{color:"blue"},n.createElement(e.WithDebug,{color:"green"})))}).add("Set options for a tree using Scope",function(){var e=l({debugOn:!0,options:{box:{color:"black"}}}),o=e.DebugContext,r=e.Box;return n.createElement(r.WithDebug,{color:"red"},n.createElement(o.Scope,{debug:{box:{color:"blue"}}},n.createElement(r.WithDebug,{color:"blue"},n.createElement(r.WithDebug,{color:"green"}))))}).add("Options set for component override inherited options",function(){var e=l({debugOn:!0,options:{box:{color:"red"}}}).Box;return n.createElement(e.WithDebug,{color:"red",debug:{color:"blue"},debugScope:!0},n.createElement(e.WithDebug,{color:"blue"},n.createElement(e.WithDebug,{color:"green",debug:{color:"green"}})))}).add("Options are shallow merged",function(){var e=l({debugOn:!0,options:{box:{color:"red",style:"dashed"}}}).Box;return n.createElement(e.WithDebug,{color:"red",debug:{style:"solid"},debugScope:!0},n.createElement(e.WithDebug,{color:"blue",debug:{color:"green"},debugScope:!0},n.createElement(e.WithDebug,{color:"green"})))}).add("Provider inherits options from parent context",function(){var e=l({debugOn:!0,options:{box:{color:"black",style:"solid"}}}),o=e.DebugContext,r=e.Box;return n.createElement(o.Scope,{debug:{box:{color:"red"}}},n.createElement(r.WithDebug,{color:"red"},n.createElement(o.Scope,{debug:{box:{style:"dashed"}}},n.createElement(r.WithDebug,{color:"blue"},n.createElement(r.WithDebug,{color:"green"})))))})}.call(this,r(147)(e))},90:function(e,o,r){"use strict";r.d(o,"a",function(){return t});var n=r(0);var t=function(e){return n.createElement("div",{style:{display:"inline-block",padding:10,margin:10,minWidth:20,minHeight:20,backgroundColor:function(e){switch(e){case"red":return"#FF000055";case"green":return"#00FF0055";case"blue":return"#0000FF55";case"black":return"#00000055";case"transparent":return"transparent"}}(e.color||"black"),border:"solid",borderStyle:e.style||"dashed",borderWidth:4,borderColor:function(e){switch(e){case"red":return"#FF0000CC";case"green":return"#00FF00CC";case"blue":return"#0000FFCC";case"black":return"#222222";case"transparent":return"transparent"}}(e.borderColor)}},e.children||null)}}},[[443,2,4]]]);
//# sourceMappingURL=iframe.9d61d811766456f47faf.bundle.js.map