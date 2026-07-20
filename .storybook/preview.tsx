import React from "react";

import type { StoryContext } from "@storybook/react";
import "@hackney/mtfh-react/reset.css";

const withContainer = (StoryFn: () => React.ReactNode, _context: StoryContext) => {
  return (
    <div className="js-enabled">
      <StoryFn />
    </div>
  );
};

export const decorators = [withContainer];
