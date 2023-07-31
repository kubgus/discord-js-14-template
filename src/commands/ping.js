const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setDescription("Replies with pong."),
    execute: async (interaction, client) => {
        await interaction.reply("Pong!");
    }
}