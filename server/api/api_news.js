const express = require('express');
const fs = require('fs');
exports.middleware = function () {
  const router = express.Router();
  router.get('/api/news', async (req, res) => {
    const category = req.query.category;
    let items = [];
    if (category.startsWith('SIGGRAPH')) {
      const json = fs.readFileSync('./datas/' + category + '.json', "utf-8");
      const papers = JSON.parse(json);
      items = items.concat(papers)
    }
    else {
      const json = fs.readFileSync('./datas/items.json', "utf-8");
      const animes = JSON.parse(json);
      items = items.concat(animes)
    }
    console.log(items.length)
    res.json(items);
  });
  return router;
}
