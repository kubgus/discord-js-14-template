# Discord.js 14 Template 🚀

This repository contains a default project that covers all of the necessary boilerplate code to get your bot up and running instantly with custom commands and more...

## Environment variables 🔗
Create a `.env` file in your root directory:
```env
# Token from the Discord Developer Portal
DISCORD_TOKEN=your_token
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
