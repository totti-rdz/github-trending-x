import axios from "axios";
import { load } from "cheerio";

const url = "https://github.com/trending/javascript?since=daily";
axios(url)
  .then((response) => {
    const html = response.data;
    const $ = load(html);
    const repos = [];
    $("h2.h3 a").each((_, elem) =>
      repos.push($(elem).text().replace(/\s+/g, ""))
    );

    console.log("repos", repos);
  })
  .catch(console.error);
