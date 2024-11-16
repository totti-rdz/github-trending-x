export const isEven = (n: number | string) => {
  if (typeof n === 'string') {
    console.warn('STRING PASSED');
    return false;
  }
  return n % 2 === 0;
};
