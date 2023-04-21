const axios = require("axios");
const cheerio = require("cheerio");
const Book = require("../models/Book");
const url = "https://truyen.tangthuvien.vn/tong-hop?ord=new&ctg=7";
const clawBook = async (req, res) => {
  try {
    const listUrl = [];
    const { data } = await axios(url);
    const $ = cheerio.load(data);
    $(".book-img-box", data).each(function () {
      const link = $(this).find("a").attr("href");
      listUrl.push(link);
    });
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    (async () => {
      const dataInsert = [];
      for (let index = 0; index < listUrl.length; index++) {
        console.log(index);
        const item = listUrl[index];
        await delay(index * 1000);
        const { data } = await axios(item);
        const name = $(".book-info", data).find("h1").text();
        const img = $(".book-img", data).find("img").attr("src");
        const author = $(".book-info", data).find(".tag > a").eq(0).text();
        const category = $(".book-info", data).find(".tag > a").eq(1).text();
        const description = $(".book-intro", data).html();
        dataInsert.push({
          name,
          author,
          image: img,
          description,
          category,
        });
      }
      const result = await Book.insertMany(dataInsert);
      console.log("ok");
    })();
    return res.send("ok");
  } catch (error) {
    return res.send("error");
  }
};

module.exports = {
  clawBook,
};
