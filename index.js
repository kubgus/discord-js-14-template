console.log(`🚀 Launching your bot...`);
console.log(`🔗 This template was provided by @kubgus.`)

require("dotenv").config();
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const debugGuild = process.env.DEBUG_GUILD;

const readDirectory = require("./util/read-directory");
const registerCommand = require("./util/register-command");

const { Client, Collection, Events, GatewayIntentBits, REST, Routes } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const rest = new REST().setToken(token);

client.commands = new Collection();
readDirectory("./commands").forEach(file => {
    const command = registerCommand(file);
    client.commands.set(command.data.name, command);
    console.log(`🔵 Registered command ${command.data.name}.`);
});

(async () => {
    const debugCommands = [...client.commands.values()].filter(command => !command.public).map(command => command.data.toJSON());
    const commands = [...client.commands.values()].filter(command => command.public).map(command => command.data.toJSON());
    try {
        console.log(`🔃 Refreshing ${commands.length} application (/) commands...`);
        const debugData = await rest.put(
            Routes.applicationGuildCommands(clientId, debugGuild),
            { body: debugCommands },
        );
        const data = await rest.put(
            Routes.applicationCommands(clientId, debugGuild),
            { body: commands },
        );
        console.log(`✨ Reloaded ${debugData.length} debug and ${data.length} public application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();

client.once(Events.ClientReady, c => {
    console.log(`✅ ${c.user.tag} is ready!`);
});

client.cooldowns = new Collection();
client.on(Events.InteractionCreate, async i => {
    if (!i.isChatInputCommand()) return;

    const command = i.client.commands.get(i.commandName);

    if (!command) {
        console.error(`🌋 No command matching ${i.commandName} was found.`);
        return;
    }

    const { cooldowns } = client;

    if (!cooldowns.has(command.data.name)) {
        cooldowns.set(command.data.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const defaultCooldownDuration = 0;
    const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

    if (timestamps.has(i.user.id)) {
        const expirationTime = timestamps.get(i.user.id) + cooldownAmount;

        if (now < expirationTime) {
            const expiredTimestamp = Math.round(expirationTime / 1000);
            return i.reply({ content: `You can use this command again <t:${expiredTimestamp}:R>.`, ephemeral: true });
        }
    }

    timestamps.set(i.user.id, now);
    setTimeout(() => timestamps.delete(i.user.id), cooldownAmount);

    try {
        await command.execute(i);
        console.log(`📥 @${i.member.displayName} executed ${i.commandName}.`)
    } catch (error) {
        console.error(error);
        if (i.replied || i.deferred) {
            await i.followUp({ content: "There was an error while executing this command! 🌋", ephemeral: true });
        } else {
            await i.reply({ content: "There was an error while executing this command! 🌋", ephemeral: true });
        }
    }
});

client.login(token);