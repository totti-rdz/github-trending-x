import axios, { isAxiosError } from 'axios';
import { logger } from '../services/logger';

const scrapeUrl = async (url: string) => {
  try {
    const response = await axios(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
      },
    });
    console.log('response', response);
    return response.data;
  } catch (error) {
    httpErrorHandler(error);
  }
};

export default scrapeUrl;

const httpErrorHandler = (error: unknown) => {
  if (error === null) throw new Error('Unrecoverable error! Error is null!');
  logger.error('Http request failed');
  if (isAxiosError(error)) {
    if (!!error.config?.url && !!error.config?.method) {
      logger.log(error.config.method + ' request to ' + error.config.url);
    }
    if (!!error.response) {
      logger.log('Server responded with a non-2xx status code');
      logger.log(
        `Status: ${error.response.status} - ${error.response.statusText}`
      );
    } else if (!!error.request) {
      logger.log('No response received from server');
    } else {
      logger.log(
        'Something happened in setting up the request that triggered an Error:'
      );
      logger.log(error.message);
    }
  }
};
