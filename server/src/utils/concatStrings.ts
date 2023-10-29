export const concatUrl = (...urlParts: string[]) =>
urlParts.filter(Boolean).join('/');