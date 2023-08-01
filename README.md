# Discord.js 14 Template 🚀

This repository contains a default project that covers all of the necessary boilerplate code to get your bot up and running instantly with custom commands and more...

- [Discord.js Docs](https://old.discordjs.dev/#/docs/discord.js/14.11.0/general/welcome)
- [Discord.js Guide](https://discordjs.guide/)
- [Discord.js Github](https://github.com/discordjs)
- [MongoDB](https://www.mongodb.com/)

## Environment variables 🔗
Create a `.env` file in your root directory:
```env
# Token from the Discord Developer Portal
DISCORD_TOKEN=your_token
# Connection string of your MongoDB Atlas Database (same as VSCode connection string)
# This can be left empty if you don't want to use MongoDB or you can clone the alpha branch for minimal features
# Get your account here: https://www.mongodb.com/
MONGO_URI=your_uri
# ID of the guild (server) you want to test your commands in
# Add a `public: true` property to your command to make it availible outside of your debug guild
DEBUG_GUILD=guild_id
```

## Start developing 🏁
To debug your bot, install all the dependencies with:
```
npm i
```
then run in debug mode:
```
npm run dev
```
Your code will be automatically reloaded with [*nodemon*](https://www.npmjs.com/package/nodemon).

## Add custom content ⚒️
Look in the **[src](https://github.com/kubgus/discord-js-14-template/tree/master/src/README.md)** folder for more info!

## Common issues 🌋
### Installation
- If you run into any errors during installation, remove the `package-lock.json` file and try again.
### MongoDB
- If you don't want to use MongoDB and leave the config empty, you will receive an error which you can ignore.
### DiscordAPIError[50001]: Missing Access
- This error usually means that your bot doesn't have access to your debug guild. (see "Environment variables")
- Use [this link](https://discord.com/developers/applications/oauth2/url-generator) to add your bot to your debug guild. (server)
### Error: Used disallowed intents
- This error occurs when your bot's "Privileged Gateway Intents" in the Discord Developer Portal don't match the intents specified in your `src/main.js` file.
- To resolve this error, you have to either:
  - Enable all privileged gateway intents in your Discord Developer Portal.
  - Or only enable intents that the bot actually uses in the `src/main.js` file.
### ValidationError: Expected a string primitive
- This error can occur for a variety of reasons, but it's most likely that one or more of your commands' SlashCommandBuilders are missing a description.
- Make sure to always set the description of a `new SlashCommandBuilder()` with the `setDescription()` method.
### User "tried to execute" command
- This issue occurs, when a command doesn't return a value.
- Fix this by returning `true`, or (ideally) return `await interaction.reply()` or any other value.
