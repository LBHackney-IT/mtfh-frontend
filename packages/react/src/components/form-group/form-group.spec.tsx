import React from 'react';
import { render } from '@testing-library/react';

import { FormGroup, Input } from '..';

test('it renders correctly', () => {
  const { getByText, getByPlaceholderText } = render(
    <FormGroup id="test" name="test" label="Test Label">
      <Input placeholder="Test Value" />
    </FormGroup>
  );

  expect(getByText('Test Label')).toBeInTheDocument();
  expect(getByPlaceholderText('Test Value')).toBeInTheDocument();
});

test('it shows the hint if defined', () => {
  const { getByText } = render(
    <FormGroup id="test" name="test" label="Test Label" hint="Test Hint">
      <Input placeholder="Test Value" />
    </FormGroup>
  );

  expect(getByText('Test Hint')).toBeInTheDocument();
});

test('it shows the error if defined', () => {
  const { getByText } = render(
    <FormGroup id="test" name="test" label="Test Label" error="Error">
      <Input placeholder="Test Value" />
    </FormGroup>
  );

  expect(getByText('Error')).toBeInTheDocument();
});

test('it adds an astreix to the label if required', () => {
  const { getByText, container } = render(
    <FormGroup id="test" name="test" label="Test Label" required>
      <Input placeholder="Test Value" />
    </FormGroup>
  );
  expect(getByText(/Test Label/).textContent).toBe('Test Label*');
  expect(container).toMatchSnapshot();
});
