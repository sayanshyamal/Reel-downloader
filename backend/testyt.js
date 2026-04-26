
import ytdl from '@distube/ytdl-core';

async function test() {
  try {
    const url = 'https://youtu.be/aLc6eYD69cE';
    console.log('Fetching info for:', url);
    const info = await ytdl.getInfo(url, {
      requestOptions: {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36",
        },
      },
    });
    console.log('Success!', info.videoDetails.title);
  } catch (err) {
    console.error('Error fetching info:', err.message);
    if (err.statusCode) console.error('Status code:', err.statusCode);
  }
}

test();
