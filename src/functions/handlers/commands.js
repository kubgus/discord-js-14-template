require("dotenv").config();
const token = process.env.DISCORD_TOKEN;
const debugGuild = process.env.DEBUG_GUILD;

const { REST, Routes } = require("discord.js");

const readDirectory = require("../../util/read-directory");
const registerCommand = require("../../util/register-command");

module.exports = (client) => {
    const rest = new REST().setToken(token);

    readDirectory("./src/commands").forEach(file => {
        const command = registerCommand(file);
        client.commands.set(command.data.name, command);
        console.log(`🔵 Registered command ${command.data.name}.`);
    });

    // TODO: Add support for guilds property which specifies the scope of the command.
    (async () => {
        const debugCommands = [...client.commands.values()].filter(command => !command.public).map(command => command.data.toJSON());
        const commands = [...client.commands.values()].filter(command => command.public).map(command => command.data.toJSON());
        try {
            //console.log(`🔄️ Syncing ${debugCommands.length + commands.length} application (/) commands...`);
            const debugData = await rest.put(
                Routes.applicationGuildCommands(client.user.id, debugGuild),
                { body: debugCommands },
            );
            const data = await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );
            console.log(`✨ Synced ${debugData.length} debug and ${data.length} public application (/) commands.`);
        } catch (error) {
            console.error(`🌋 Error occurred while syncing commands: ${error}.`);
        }
    })();
}