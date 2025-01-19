export const StringHelper = {
  capitalize: (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1),

  isValidString: (string: unknown): string is string =>
    typeof string === 'string' && string.trim() !== '',
};
