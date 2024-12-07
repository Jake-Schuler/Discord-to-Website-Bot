import { Client, Events, GatewayIntentBits } from 'npm:discord.js';
import dotenv from 'npm:dotenv';
import express from 'npm:express';

dotenv.config();

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
        const channelId = "1260744912186638356"; // Your channel ID
        const channel = await client.channels.fetch(channelId);

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
app.get('/', async (req, res) => {
    const messages = await fetchMessages();
    res.send(messages);
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});
