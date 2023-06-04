import axios from "axios";

const scrapeUrl = async (url) => {
  const response = await axios(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
    },
  });

  return response.data;
};

export default scrapeUrl;
