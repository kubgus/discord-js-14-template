// WARNING: This file is essential to the bot's functionality. Do not modify it unless you know what you're doing.

const { Collection, InteractionType } = require('discord.js');

// Handles all interactions
module.exports = {
    execute: async (interaction, client) => {
        if (interaction.isChatInputCommand()) { // Handles slash commands and cooldowns
            const slashCommand = interaction.client.commands.get(interaction.commandName);
            if (!slashCommand) {
                console.error(`🌋 No slash command matching ${interaction.commandName} was found.`);
                return;
            }

            const { cooldowns } = client;
            const now = Date.now();
            if (!cooldowns.has(slashCommand.data.name)) cooldowns.set(slashCommand.data.name, new Collection());
            const timestamps = cooldowns.get(slashCommand.data.name);
            const cooldownAmount = (slashCommand.cooldown ?? 0) * 1000;
            if (timestamps.has(interaction.user.id)) {
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
                if (now < expirationTime) return interaction.reply(
                    { content: `You can use this command again <t:${Math.round(expirationTime / 1000)}:R>. 🕐`, ephemeral: true }
                );
            }

            try {
                const success = await slashCommand.execute(interaction, client);

                if (!success) console.log(`📥 @${interaction.user.tag} tried to execute ${interaction.commandName}.`);
                else {
                    timestamps.set(interaction.user.id, now);
                    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

                    console.log(`📥 @${interaction.user.tag} executed ${interaction.commandName}.`);
                }
            } catch (error) {
                console.error(`🌋 Error occurred while executing command ${interaction.commandName}: ${error}.`);
                const message = { content: `This command failed to execute. Please try again later.`, ephemeral: true };
                if (interaction.replied || interaction.deferred) await interaction.followUp(message);
                else await interaction.reply(message);
            } finally { return; }
        }
        else if (interaction.isButton()) { // Handles button clicks
            console.log(`📥 @${interaction.user.tag} clicked ${interaction.customId}.`);
            return;
        }

        console.log(`📥 @${interaction.user.tag} used an unknown interaction: ${interaction.id}.`);
    }
}