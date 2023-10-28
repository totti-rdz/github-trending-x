import axios from 'axios';
import { httpErrorHandler } from './httpErrorHandler';

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
