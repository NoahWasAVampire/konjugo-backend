const express = require('express')
const app = express()
const port = 3000
const db = require("./database.js");
const tools = require("./tools.js");



app.use(express.json());

app.get('/challange', async (req, res) => {
  let attributes = req.body.attributes;
  let lemmas = req.body.lemmas;
  let max = req.body.max;

  let getWordQuery = `
  select word.wordId, word.lemma, word.translated, flected, attributes from word join flection on (word.wordId = flection.wordId) where lemma = ? ${"OR lemma = ?".repeat(lemmas.length - 1)};
  `;

  let allFlections = [];

  let result = await db.get(getWordQuery, lemmas);
  console.log(result);
  allFlections.push(...tools.filterByAttributes(result, attributes));

  let selectedFlections = [];
  if(max) {
    if(max < allFlections.length) {
      for(let i = 0; i < max; i++) {
        let index = Math.floor(Math.random()*allFlections.length);
        selectedFlections.push(allFlections[index]);
        allFlections.splice(index, 1);
      }
    }
    else{
      selectedFlections = allFlections;
    }
  } else {
    selectedFlections = allFlections;
  }

  res.send({ok:selectedFlections});

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})