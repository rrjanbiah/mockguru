import * as React from "react";

declare global {
  namespace JSX {
    // Use React's IntrinsicElements and Element from React
    type IntrinsicElements = React.JSX.IntrinsicElements;
    type Element = React.JSX.Element;
    type ElementClass = React.Component;
    interface ElementAttributesProperty {
      props: object; // Replaced {} with object
    }
    interface ElementChildrenAttribute {
      children: unknown; // Replaced {} with unknown
    }
  }
}
