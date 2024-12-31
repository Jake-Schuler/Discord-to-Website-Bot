import { Client, Events, GatewayIntentBits } from 'npm:discord.js';
import "jsr:@std/dotenv/load";
import express from 'npm:express';

if (!Deno.env.get("DISCORD_TOKEN") || !Deno.env.get("DISCORD_CHANNEL_ID")) {
    console.error("Missing DISCORD_TOKEN or DISCORD_CHANNEL_ID environment variables.");
    Deno.exit(1);
}

const app = express();

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// When the client is ready, run this code (only once).
client.once(Events.ClientReady, () => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
});

// Function to fetch messages
async function fetchMessages() {
    try {
        const channel = await client.channels.fetch(Deno.env.get("DISCORD_CHANNEL_ID"));

        if (!channel || !channel.isTextBased()) {
            console.error("Channel not found or not a text-based channel.");
            return "Channel not accessible.";
        }

        const messages = await channel.messages.fetch({ limit: 1 });
        console.log(`Received ${messages.size} messages`);
        return messages.map((message) => ({
            content: message.content,
            author: {
                username: message.author.username,
                avatarURL: message.author.avatarURL(),
            },
        }));

    } catch (error) {
        console.error("Error fetching messages:", error);
        return "Error fetching messages.";
    }
}

// Express route to fetch and return messages
app.get('/', async (_req, res) => {
    const messages = await fetchMessages();
    res.send(messages);
});

// Log in to Discord with your client's token
client.login(Deno.env.get("DISCORD_TOKEN"));

app.listen(Deno.env.get("BACKEND_PORT"), () => {
    console.log(`Example app listening on port ${Deno.env.get("BACKEND_PORT")}`)
});
