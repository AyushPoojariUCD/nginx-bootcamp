const express = require('express');
const app = express();
const PORT = 3000;

app.get('/api/data', (req, res) => {
  // Simulate slow response (2 seconds)
  setTimeout(() => {
    res.json({ message: "Hello from backend 🚀", timestamp: new Date() });
  }, 2000);
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});