const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  console.log(`user connected`);
  res.sendFile(path.resolve('../main.html'));
});

app.get('/main.js', (req, res) => {
  res.sendFile(path.resolve('../main.js'));
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
