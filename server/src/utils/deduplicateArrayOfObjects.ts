import { logger } from '../services/logger';

export const deduplicateArrayOfObjects = <T>(
  arr: T[],
  uniquePropertyKey: string
) => {
  if (
    !Array.isArray(arr) ||
    arr.some((elem) => !elem[uniquePropertyKey])
  ) {
    logger.warn(
      `Not every element in the array to be deduplicated contains the unique property.
      Deduplication was cancelled and the array has been returned.
      Please provide a valid unique property key that every element in the array has.`
    );
    return arr;
  }

  return arr.reduce((accumulator, current) => {
    if (
      !accumulator.find(
        (language) => language[uniquePropertyKey] === current[uniquePropertyKey]
      )
    ) {
      accumulator.push(current);
    }
    return accumulator;
  }, [] as T[]);
};
