import ytDlp from 'youtube-dl-exec';

async function testYtDlp() {
  try {
    const output = await ytDlp('https://youtube.com/shorts/t28BbBVMXfU', {
      dumpJson: true,
      noWarnings: true,
      preferFreeFormats: true
    });
    
    console.log("Title:", output.title);
    console.log("Thumbnail:", output.thumbnail);
    
    // find a format with both audio and video
    const formats = output.formats || [];
    const muxed = formats.filter(f => f.vcodec !== 'none' && f.acodec !== 'none' && f.ext === 'mp4');
    
    if (muxed.length > 0) {
      console.log("Best muxed URL:", muxed.pop().url);
    } else {
      const bestVideo = formats.filter(f => f.vcodec !== 'none' && f.ext === 'mp4').pop();
      console.log("Best Video URL:", bestVideo?.url);
    }
    
  } catch (err) {
    console.error("yt-dlp error:", err.message);
  }
}

testYtDlp();
