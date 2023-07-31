const { Collection, Events } = require('discord.js');

// This file handles interactions and cooldowns
module.exports = (client) => {
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
                return i.reply({ content: `You can use this command again <t:${expiredTimestamp}:R>. 🕐`, ephemeral: true });
            }
        }

        timestamps.set(i.user.id, now);
        setTimeout(() => timestamps.delete(i.user.id), cooldownAmount);

        try {
            await command.execute(i, client);
            console.log(`📥 @${i.member.displayName} executed ${i.commandName}.`)
        } catch (error) {
            try {
                console.error(`🌋 Error occurred while executing command ${i.commandName}: ${error}.`);
                const message = {
                    content: `${error.rawError.message}. 🌋`,
                    ephemeral: true
                };
                if (i.replied || i.deferred) {
                    await i.followUp(message);
                } else {
                    await i.reply(message);
                }
            } catch { console.error(`🌋 Could not properly handle an error on command ${i.commandName}: ${error}.`); }
        }
    });
}