const express = require('express');
const app = express();
console.log('Authentication module initialized and loaded');

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => console.log('Listening on port 3000'));