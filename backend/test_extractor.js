import ytDlp from 'youtube-dl-exec';

async function test() {
  try {
    const info = await ytDlp('https://youtu.be/dQw4w9WgXcQ', {
      dumpJson: true,
      extractorArgs: "youtube:player_client=android,web"
    });
    console.log('Success:', info.title);
  } catch (err) {
    console.log('Error:', err.message);
  }
}
test();
