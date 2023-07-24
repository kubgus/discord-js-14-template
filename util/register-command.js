const { Client, SlashCommandBuilder } = require("discord.js");
const path = require("path");

module.exports = (file) => {
    const name = path.basename(file, ".js");

    const {
        data = new SlashCommandBuilder()
            .setDescription("Press ENTER to execute this command."),
        execute,
        cooldown = 0,
        public = false, // Determines whether the command can be used outside of the debug guild
    } = require(`../${file}`);

    data.setName(name);

    return { data, execute, cooldown, public };
}