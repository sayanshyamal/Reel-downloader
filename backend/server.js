const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;

// ফ্রন্টএন্ড থেকে রিকোয়েস্ট অ্যালাও করা
app.use(cors());
app.use(express.json());

// যখন ফ্রন্টএন্ড ডাউনলোড রিকোয়েস্ট পাঠাবে
app.post('/api/download', async (req, res) => {
    const videoUrl = req.body.url; // ইউজারের দেওয়া ইনস্টাগ্রাম লিংক

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
        // ফ্রন্টএন্ডে ডাটা পাঠিয়ে দেওয়া
        res.json(response.data);
    } catch (error) {
        console.error("API Error:", error.message);
        res.status(500).json({ error: 'সার্ভার থেকে ডাটা আনতে সমস্যা হয়েছে।' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});