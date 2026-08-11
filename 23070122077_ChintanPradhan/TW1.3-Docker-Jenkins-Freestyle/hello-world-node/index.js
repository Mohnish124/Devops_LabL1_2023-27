const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World from Docker!');
});

app.listen(5000, () => console.log('Listening on port 5000'));
