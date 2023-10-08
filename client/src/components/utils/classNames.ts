type ClassType = string | false | undefined;

export const classNames = (...classNames: ClassType[]) => {
  const filtered = classNames.filter(Boolean) as string[]; // every other type is filtered
  const trimmed = filtered.map((string) => string.trim());
  return trimmed.join(' ');
};
