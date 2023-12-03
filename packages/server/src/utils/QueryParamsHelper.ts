export class QueryParamsHelper {
  public static appendQueryObject = (query: Record<string, unknown>) => {
    let queryString = '';
    for (const [key, val] of Object.entries(query))
      queryString += key + (!!val ? '=' + val : '') + '&';
    if (queryString.length > 0) queryString = '?' + queryString.slice(0, -1);
    return queryString;
  };

  public static getQueryStringFromUrl = (url: string) => {
    const queryParams = this.prefixQuotationMark(
      url.split('?')[1]
    ) as // split()[1] may return undefined
    string | undefined;
    return queryParams;
  };

  private static prefixQuotationMark = (str: string) =>
    !!str && !str.startsWith('?') ? '?' + str : str;
}
