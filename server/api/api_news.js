const express = require('express');
const fs = require('fs');
exports.middleware = function () {
  const router = express.Router();
  router.get('/api/news', async (req, res) => {
    var json = fs.readFileSync('./datas/items.json', "utf-8");
    var items = JSON.parse(json);
    console.log(items.length)
    res.json(items);
  });
  return router;
}
