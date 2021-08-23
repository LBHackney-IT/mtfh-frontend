import React from "react"
import { StoryContext } from "@storybook/react"
import "@hackney/mtfh-react/reset.css"

const withContainer = (StoryFn, context: StoryContext) => {
  return (
    <div className="js-enabled">
      <StoryFn />
    </div>
  )
}

// export const parameters = {
//   actions: { argTypesRegex: "^on[A-Z].*" },
//   controls: {
//     matchers: {
//       color: /(background|color)$/i,
//       date: /Date$/,
//     },
//   },
// };

export const decorators = [withContainer]
