export const logger = {
  info: (message: string) =>
    console.info(
      '\x1b[33m%s\x1b[0m', // change font color to yellow
      '[INFO] ' + message,
      '\x1b[0m' // reset font color
    ),
  warn: (message: string) =>
    console.error(
      '\x1b[33m%s\x1b[0m', // change font color to yellow
      '[WARNING] ' + message,
      '\x1b[0m' // reset font color
    ),
  error: (message: string) =>
    console.error(
      '\x1b[31m%s\x1b[0m', // change font color to red
      '[Error] ' + message,
      '\x1b[0m' // reset font color
    ),
};
