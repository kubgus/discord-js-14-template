const { Collection } = require('discord.js');

module.exports = {
    execute: async (interaction, client) => {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`🌋 No command matching ${interaction.commandName} was found.`);
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

        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1000);
                return interaction.reply({ content: `You can use this command again <t:${expiredTimestamp}:R>. 🕐`, ephemeral: true });
            }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        try {
            await command.execute(interaction, client);
            console.log(`📥 @${interaction.member.displayName} executed ${interaction.commandName}.`)
        } catch (error) {
            try {
                console.error(`🌋 Error occurred while executing command ${interaction.commandName}: ${error}.`);
                const message = {
                    content: `${error.rawError.message}. 🌋`,
                    ephemeral: true
                };
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp(message);
                } else {
                    await interaction.reply(message);
                }
            } catch { console.error(`🌋 Could not properly handle an error on command ${interaction.commandName}: ${error}.`); }
        }
    }
}