const express = require('express');
const app = express();
const PORT = 3000;

app.get('/api/data', (req, res) => {
  setTimeout(() => {
    res.json({ message: "Cached response 🚀", time: new Date() });
  }, 2000); // simulate 2s delay
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
