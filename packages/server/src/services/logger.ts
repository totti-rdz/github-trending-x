type Loggable = Parameters<typeof console.log>;

export const logger = {
  log: (...message: Loggable) => console.log(message.join(' ')),
  info: (...message: Loggable) =>
    console.info(
      '\x1b[33m%s\x1b[0m', // change font color to yellow
      '[INFO] ' + message.join(' '),
      '\x1b[0m' // reset font color
    ),
  warn: (...message: Loggable) =>
    console.error(
      '\x1b[33m%s\x1b[0m', // change font color to yellow
      '[WARNING] ' + message.join(' '),
      '\x1b[0m' // reset font color
    ),
  error: (...message: Loggable) =>
    console.error(
      '\x1b[31m%s\x1b[0m', // change font color to red
      '[Error] ' + message.join(' '),
      '\x1b[0m' // reset font color
    ),
};
