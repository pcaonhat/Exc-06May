const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const pool = require('./db/connection');



const server = http.createServer(async (req, res) => {
  const reqUrl = url.parse(req.url, true);

  // API endpoint /players
  if (reqUrl.pathname === '/api/players' && req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM players ORDER BY id ASC');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result.rows));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Database error' }));
    }
  }

  else if (req.method === 'GET') {
    const staticPath = path.join(__dirname, '../client/build');
    const filePath = path.join(staticPath, reqUrl.pathname === '/' ? 'index.html' : reqUrl.pathname);

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404);
          res.end('Not Found');
        } else {
          res.writeHead(500);
          res.end('Server Error');
        }
      } else {
        const mimeTypes = {
          '.html': 'text/html',
          '.js': 'text/javascript',
          '.css': 'text/css',
          '.json': 'application/json',
          '.png': 'image/png',
        };
        const extname = path.extname(filePath);
        const contentType = mimeTypes[extname] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  }
});

// Khởi động server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});