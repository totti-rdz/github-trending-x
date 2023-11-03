export const getQueryParamsFromUrl = (url: string) => {
  const queryParams = prefixQuotationMark(url.split('?')[1]);
  return queryParams;
};

const prefixQuotationMark = (str: string) =>
  !!str && !str.startsWith('?') ? '?' + str : str;
