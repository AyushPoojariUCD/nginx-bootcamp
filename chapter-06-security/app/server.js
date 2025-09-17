const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Secure App 🚀');
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});