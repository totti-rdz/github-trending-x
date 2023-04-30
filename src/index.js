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

    const links = [];
    $("h2.h3 a").each((_, elem) => {
      const link = $(elem).attr("href");
      links.push(link);
    });
    console.log("repos", repos);
    console.log("links", links);
  })
  .catch(console.error);
