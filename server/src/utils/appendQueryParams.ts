export const appendQueryParams = (query: Record<string, unknown>) => {
  let queryString = "";
  for (const [key, val] of Object.entries(query))
    queryString += key + (!!val ? "=" + val : "") + "&";
  if (queryString.length > 0) queryString = "?" + queryString.slice(0, -1);
  return queryString;
};
