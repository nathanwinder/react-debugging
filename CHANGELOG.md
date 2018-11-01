# Change Log

## 0.4.0 Refactored context provider

1. Context.Provider is now a normal Provider
2. Added a Scope component in the context for changing debug and options in scope
3. Removed the "debugDescendants" prop and replaced with "debugScope"
4. Fixed known bugs with inheritance

## 0.3.0 Added Storybook

1. Created a storybook to demonstrate features
2. Added support for option-less context.

## 0.2.0 Refactored withDebugProps HOC

1. Enable/disable debugging by setting true/false for `debug` property of wrapped component.
2. Set debug options by setting `debug` property to an options object.
3. Enable/disable debugging in descendant components using the `debugDescendants` property.
4. Set options for descendants by setting the `debugDescendants` property to an options object.
5. Support for namespaced options
6. Removed disabling debugging globally, it did not work consistently.

## 0.1.0 Initial Features
