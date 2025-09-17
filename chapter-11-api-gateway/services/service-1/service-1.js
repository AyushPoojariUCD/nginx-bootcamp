const express = require('express');
const app = express();
const PORT = 3001;

app.get('/hello', (req, res) => {
  res.json({ service: "v1", message: "Hello from Service V1 🚀" });
});

app.get('/secure', (req, res) => {
  res.json({ service: "v1", message: "Secure endpoint accessed ✅" });
});

app.listen(PORT, () => console.log(`Service V1 running on port ${PORT}`));