const express = require('express');
const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
  res.send('Hello from Backend Server 1 🚀');
});

app.listen(PORT, () => {
  console.log(`Server 1 running on port ${PORT}`)
});