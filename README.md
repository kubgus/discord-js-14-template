# Discord.js 14 Template 🚀

This repository contains a default project that covers all of the necessary boilerplate code to get your bot up and running instantly with custom commands and more...

## Environment variables
```env
DISCORD_TOKEN=your_token
CLIENT_ID=bot_id
DEBUG_GUILD=guild_id
```

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

## Common issues
### Installation
- If you run into any errors during installation, remove the `package-lock.json` file and try again.
### Commands
- Make sure to always set the description of a `new SlashCommandBuilder()` with the `setDescription()` method.
