import axios from "axios";
import { load } from "cheerio";

const url = "https://github.com/trending/javascript?since=daily";

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = load(html);
    const repos = [];
    $("h2.h3 a").each((idx, elem) => {
      const text = $(elem).text().replace(/\s+/g, "");
      const link = $(elem).attr("href");
      repos.push({ id: idx, text, link });
    });

    console.log("repos", repos);
  })
  .catch(console.error);
