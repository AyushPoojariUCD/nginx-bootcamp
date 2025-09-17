const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello over HTTP/2 🔥');
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
