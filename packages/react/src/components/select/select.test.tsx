import React from "react";
import { testA11y } from "@hackney/mtfh-test-utils";
import { render } from "@testing-library/react";

import { FormGroup } from "../form-group";
import { Select } from "./select";

test("it passes a11y", async () => {
  const { container } = render(
    <FormGroup id="test" name="test" label="Select Test">
      <Select>
        <option value="name">Name</option>
      </Select>
    </FormGroup>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders correctly", () => {
  const { container } = render(<Select />);
  expect(container).toMatchSnapshot();
});

test("it renders correctly with error", () => {
  const { container } = render(<Select error />);
  expect(container).toMatchSnapshot();
});
