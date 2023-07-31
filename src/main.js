console.log(`🚀 Launching your bot...`);
console.log(`🔗 This template was provided by @kubgus.`)

require("dotenv").config();
const token = process.env.DISCORD_TOKEN;

const readDirectory = require("./util/read-directory");

const { Client, Collection, GatewayIntentBits } = require("discord.js");
const path = require("path");

// All intents are enabled by default
// This is fine for development, but consider only enabling the intents you actually need in production
// https://discord.com/developers/docs/topics/gateway#gateway-intents
const intents = Object.keys(GatewayIntentBits).map((a) => {
    return GatewayIntentBits[a]
});

const client = new Client({
    intents, ws: { intents }
});

client.commands = new Collection();
client.cooldowns = new Collection();

readDirectory("./src/functions").forEach(file => {
    const name = path.basename(file, ".js");
    try {
        console.log(`🟢 Loading the ${name} function.`);
        require(path.toNamespacedPath(file))(client);
    } catch (error) {
        console.error(`🌋 Error occurred while executing function ${name}: ${error}.`);
    }
});

client.once("ready", () => {
    console.log(`✅ ${client.user.tag} is ready!`);

    client.handleCommands();
    client.handleEvents();
    client.connectMongo();
});

// Login to Discord
client.login(token);