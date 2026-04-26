const http = require('http');

const data = JSON.stringify({ url: 'https://youtu.be/dQw4w9WgXcQ' });

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/download/youtube',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Status:', res.statusCode, '\nBody:', body));
});

req.on('error', e => console.error(e));
req.write(data);
req.end();
