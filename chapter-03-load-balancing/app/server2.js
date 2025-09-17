const express = require('express');
const app = express();
const PORT = 3002;

app.get('/', (req, res) => {
  res.send('Hello from Backend Server 2 🎯');
});

app.listen(PORT, () => {
  console.log(`Server 2 running on port ${PORT}`);
});
