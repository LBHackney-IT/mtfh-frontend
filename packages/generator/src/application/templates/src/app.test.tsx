import { render } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";

import App from "./app";

describe("<App />", () => {
  test("it renders correctly", () => {
    render(<App />, { url: "/<%= projectName %>" });
    expect(screen.getAllByText("<%= name %>"));
  });
});
