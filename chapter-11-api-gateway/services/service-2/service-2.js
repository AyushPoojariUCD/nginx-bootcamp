const express = require('express');
const app = express();
const PORT = 3002;

app.get('/hello', (req, res) => {
  res.json({ service: "v2", message: "Hello from Service V2 🎯" });
});

app.listen(PORT, () => console.log(`Service V2 running on port ${PORT}`));
