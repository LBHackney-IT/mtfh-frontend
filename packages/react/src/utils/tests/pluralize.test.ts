import pluralize from '../pluralize';

test('should pluralize word if value is greater than 1', () => {
  expect(pluralize('word', 2)).toBe('words');
});

test('should pluralize word if value is equal to 0', () => {
  expect(pluralize('word', 0)).toBe('words');
});

test('should not pluralize word if value is equal to 1', () => {
  expect(pluralize('word', 1)).toBe('word');
});

test('should pluralize word and ignore value sign', () => {
  expect(pluralize('word', -2)).toBe('words');
});
