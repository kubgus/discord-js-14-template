require("dotenv").config();
const token = process.env.DISCORD_TOKEN;
const debugGuild = process.env.DEBUG_GUILD;

const { REST, Routes } = require("discord.js");

const readDirectory = require("../../util/read-directory");
const loadCommand = require("../../util/load-command");

// Defines the handleCommands function
module.exports = (client) => {
    // Registers all commands in the commands directory and syncs them with Discord
    client.handleCommands = async () => {
        readDirectory("./src/commands").forEach(file => {
            const command = loadCommand(file);
            client.commands.set(command.data.name, command);
            console.log(`🔵 Registered command ${command.data.name}.`);
        });

        // TODO: Add support for guilds property which specifies the scope of the command.
        const rest = new REST().setToken(token);
        (async () => {
            const debugCommands = [...client.commands.values()].filter(command => !command.public).map(command => command.data.toJSON());
            const commands = [...client.commands.values()].filter(command => command.public).map(command => command.data.toJSON());
            try {
                const debugData = await rest.put(Routes.applicationGuildCommands(client.user.id, debugGuild), { body: debugCommands });
                const data = await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
                console.log(`✨ Synced ${debugData.length} debug and ${data.length} public application (/) commands.`);
            } catch (error) {
                console.error(`🌋 Error occurred while syncing commands: ${error}.`);
            }
        })();
    }
}