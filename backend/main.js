
require('dotenv').config();

const express = require('express');
const app = express();


const PORT = process.env.PORT || 5000;

app.use(express.json());


app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Backend!' });
});


app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});