require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
  res.send('HELLO WORLD');
});

const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);
