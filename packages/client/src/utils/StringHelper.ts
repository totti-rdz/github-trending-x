export const StringHelper = {
  capitalize: (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1),

  isValidString: (string: unknown) =>
    typeof string === 'string' && string.trim() !== '',
};
