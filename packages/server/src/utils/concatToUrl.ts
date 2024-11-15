export const concatToUrl = (...urlParts: string[]) =>
  urlParts.filter(Boolean).join('/');
