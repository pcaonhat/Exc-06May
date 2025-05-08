const express = require('express');
const pool = require('./db/connection');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// API lấy dữ liệu player
app.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM player');
      res.render('index', { players: result.rows });
    } catch (err) {
      console.error('Lỗi khi truy vấn:', err);
      res.status(500).send('Lỗi server');
    }
  });
  
  // Khởi động server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
  });