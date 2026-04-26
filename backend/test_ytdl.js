import ytdl from '@distube/ytdl-core';

async function testYtdl() {
  try {
    const info = await ytdl.getInfo('https://youtube.com/shorts/dz_dy9COvCg');
    console.log('Success:', info.videoDetails.title);
  } catch (err) {
    console.error('Failed:', err.message);
  }
}
testYtdl();
