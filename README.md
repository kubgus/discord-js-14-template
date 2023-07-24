# Discord.js 14 Template 🚀

This repository contains a default project that covers all of the necessary boilerplate code to get your bot up and running instantly with custom commands and more...

## Environment variables
```env
DISCORD_TOKEN=your_token
CLIENT_ID=bot_id
DEBUG_GUILD=guild_id
```

## Custom commands
- [Wiki](https://discordjs.guide/slash-commands/advanced-creation.html)
  
To add a custom command, create a new Javascript file in the `commands/` folder:
```js
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setDescription("Shows the user how to create commands."),
    execute: async (interaction) => {
        await interaction.reply("Wow!");
    },
    cooldown: 3,
    public: true
}
```
The command name is automatically set by its file name, meaning that `ping.js` will automatically show up on Discord as "/ping".

### What you need to know
1. The `data` property (if defined) must contain a `new SlashCommandBuilder()` with at least a description.
1. The `execute` property is the **only required property** for one command.
1. The `cooldown` property is defined in seconds. The default value is 0.
1. The `public` bool property only needs to be defined if you want to be able to use that command outside of your debug guild.

## Start developing
To debug your bot, install all the dependencies with:
```
npm i
```
then run in debug mode:
```
npm run dev
```
Your code will be automatically reloaded with [*nodemon*](https://www.npmjs.com/package/nodemon).
