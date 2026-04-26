const http = require('https');

const data = JSON.stringify({ url: 'https://youtu.be/dQw4w9WgXcQ' });

const options = {
  hostname: 'anyclip-api.onrender.com',
  port: 443,
  path: '/api/download/youtube',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
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
