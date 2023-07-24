const { Client, SlashCommandBuilder } = require("discord.js");
const path = require("path");

module.exports = (file) => {
    const name = path.basename(file, ".js");

    const {
        data = new SlashCommandBuilder()
            .setDescription("Press ENTER to execute this command."),
        execute,
        cooldown = 0,
    } = require(`../${file}`);

    data.setName(name);

    return { data, cooldown, execute };
}