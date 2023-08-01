# 🔵 Custom commands

- [Wiki](https://discordjs.guide/slash-commands/advanced-creation.html)
  
To add a custom command, create a new Javascript file in the `commands/` folder:
```js
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setDescription("Shows the user how to create commands."),
    execute: async (interaction, client) => {
        return await interaction.reply("Wow!");
    },
    cooldown: 3,
    public: true
}
```
The command name is automatically set by its file name, meaning that `ping.js` will automatically show up on Discord as "/ping".

## What you need to know
1. If the command returns false or doesn't return anything, it won't be registered as successful.
    - You will see this if the command execution log says `...tried to execute...` instead of `...executed...`.
    - Fix this by returning the reply, or simply by adding `return true;` after successful execution.
    - If you don't want the command to be registered as successful, add `return;` or `return false;`.
    - This feature exists so that the bot can distinguish, which commands finished successfully. (for example, when applying cooldowns)
1. The `data` property (if defined) must contain a `new SlashCommandBuilder()` with at least a description.
1. The `execute` property is the **only required property** for one command.
1. The `cooldown` property is defined in seconds. The default value is 0.
1. The `public` bool property only needs to be defined if you want to be able to use that command outside of your debug guild.
