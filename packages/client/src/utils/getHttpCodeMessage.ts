const httpStatusMessages: { [key: number]: string } = {
  204: '404: Currently, there are no trending repositories for the selected language',
  404: '404: The requested API route does probably not exist',
};

export const getHttpCodeMessage = (status: number | null) => {
  const message =
    // @ts-ignore to suppress TS error due to possible null status, which does not throw a runtime error. Adding workarounds lead to unnecessary complexity
    httpStatusMessages[status] ||
    `An error occurred${!!status ? ' with HTTP status code: ' + status : ''}`;
  return message;
};
