import React from "react"

/**
 * How do we add a new base element to React's JSX?
 *
 * You'll need to do some detective work: check
 * out JSX.IntrinsicElements.
 *
 * The JSX namespace comes from React - you'll need
 * to check out React's type definitions.
 */

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "custom-element": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}

const element = (
  <custom-element className="" style={{}}>
    hello world
  </custom-element>
)

const asdf = <a>asdf</a>
