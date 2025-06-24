const express = require('express');
const summarizeText = require('./summarize');
const path = require('path');
require('dotenv').config();
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, '../Frontend')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});


app.post('/summarize', async (req, res) => {
  const text = req.body.text_to_summarize;
  try {
    const summary = await summarizeText(text);
    res.send(summary);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Failed to summarize');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
