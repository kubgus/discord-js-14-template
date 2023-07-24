const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setDescription("Adds two numbers together.")
        .addIntegerOption(option => option.setName("num1").setDescription("The first number").setRequired(true))
        .addIntegerOption(option => option.setName("num2").setDescription("The second number").setRequired(true)),
    execute: async (interaction) => {
        await interaction.reply(`The sum is ${interaction.options.getInteger("num1") + interaction.options.getInteger("num2")}.`);
    },
    public: true,
}