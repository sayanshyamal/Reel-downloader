const express = require('express');
const https = require('https');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// ফ্রন্টএন্ড থেকে রিকোয়েস্ট অ্যালাও করা
app.use(cors());
app.use(express.json());

// --- ১. ফ্রন্টএন্ড থেকে ভিডিও খোঁজার রিকোয়েস্ট (POST) ---
app.post('/api/download', async (req, res) => {
    const videoUrl = req.body.url; // ইউজারের দেওয়া ইনস্টাগ্রাম লিংক

    // RapidAPI-তে পাঠানোর জন্য কনফিগারেশন
    const options = {
        method: 'GET',
        url: 'https://instagram-reels-downloader-api.p.rapidapi.com/download',
        params: { url: videoUrl },
        headers: {
            'x-rapidapi-key': '1d3c664356msh76d4c41dada8eabp1d9fcajsna797af8ee7be', // আপনার API Key
            'x-rapidapi-host': 'instagram-reels-downloader-api.p.rapidapi.com'
        }
    };

    try {
        // RapidAPI থেকে ডাটা আনা
        const response = await axios.request(options);
        // ফ্রন্টএন্ডে ডাটা পাঠিয়ে দেওয়া
        res.json(response.data);
    } catch (error) {
        console.error("API Error:", error.message);
        res.status(500).json({ error: 'সার্ভার থেকে ডাটা আনতে সমস্যা হয়েছে।' });
    }
});

// --- ২. Direct Download Proxy Route (GET) ---
app.get('/api/force-download', (req, res) => {
    const videoUrl = req.query.url;
    
    if (!videoUrl) {
        return res.status(400).send("URL is required");
    }

    // ব্রাউজারকে বলে দেওয়া হচ্ছে যে এটি একটি ফাইল এবং এটি সরাসরি ডাউনলোড করতে হবে
    res.setHeader('Content-Disposition', 'attachment; filename="ReelSave_Video.mp4"');
    res.setHeader('Content-Type', 'video/mp4');

    // ব্যাকএন্ড ইনস্টাগ্রাম থেকে ভিডিও নামিয়ে সরাসরি ইউজারকে পাঠাচ্ছে
    https.get(videoUrl, (response) => {
        response.pipe(res);
    }).on('error', (err) => {
        console.error("Proxy Download Error:", err);
        res.status(500).send("Error downloading the video");
    });
});

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});