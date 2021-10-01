const BEGIN_WITH_LETTER = /^[a-zA-Z]/;
const ALLOWED_CHARACTERS = /^[a-zA-Z0-9-]+$/;

export default function validateNaming(input: string) {
  if (!input) {
    return `Cannot be empty!`;
  }
  if (!BEGIN_WITH_LETTER.test(input)) {
    return `Must begin with a letter`;
  }
  if (!ALLOWED_CHARACTERS.test(input)) {
    return `May only contain letters, numbers, dash or underscore`;
  }
  return true;
}
