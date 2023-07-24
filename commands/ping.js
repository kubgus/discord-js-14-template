const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setDescription("Replies with Pong!"),
    execute: async (interaction) => {
        await interaction.reply("Pong!");
    },
}