import { StringHelper } from './StringHelper';

type ClassType = string | false | undefined;

export const classNames = (...classNames: ClassType[]) => {
  const filtered = classNames.filter(StringHelper.isValidString)
  const trimmed = filtered.map((string) => string.trim());
  return trimmed.join(' ');
};
