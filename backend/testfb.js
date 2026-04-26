import axios from 'axios';

async function test() {
  try {
    const url = 'https://www.facebook.com/share/v/1BGxQnLome/';
    const { data: html } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
      }
    });
    const m1 = html.match(/property="og:image"\s+content="([^"]+)"/i);
    const m2 = html.match(/"thumbnail_url"\s*:\s*"([^"]+)"/i);
    console.log('og:image ->', m1 ? m1[1] : 'NOT FOUND');
    console.log('thumbnail_url ->', m2 ? m2[1] : 'NOT FOUND');
    
    const m3 = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    console.log('title ->', m3 ? m3[1] : 'NOT FOUND');
  } catch (err) {
    console.error(err.message);
  }
}
test();
