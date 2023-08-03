# ⚙️ Components
The `components/` directory doesn't have a strict pattern. You can create your own components and use (and reuse) them in anywhere else.

## Resources
### ComponentBuilders
- [ActionRowBuilder](https://old.discordjs.dev/#/docs/discord.js/main/class/ActionRowBuilder)
- [ButtonBuilder](https://old.discordjs.dev/#/docs/discord.js/14.11.0/class/ButtonBuilder)
- [EmbedBuilder](https://old.discordjs.dev/#/docs/discord.js/14.11.0/class/EmbedBuilder)
- [StringSelectMenuBuilder](https://old.discordjs.dev/#/docs/discord.js/14.11.0/class/StringSelectMenuBuilder)

Those are just some builder classes you can use. You can find more in the [Discord.js documentation](https://old.discordjs.dev/#/docs/discord.js/main/general/welcome).
### Collectors
Collectors are not a part of creating components, but you will need them to use components. Read more about them if you want to learn how to create component interactions:

- [Collectors](https://discordjs.guide/popular-topics/collectors.html)

## Examples
```js
const { EmbedBuilder } = require("discord.js");

// The signed embed component returns an embed with a timestamp and footer.
// This is useful when you want to reuse the same embed style in several commands.
module.exports = async (interaction) => {
    return new EmbedBuilder()
        .setTimestamp()
        .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL());
}
```
```js
const { ActionRowBuilder, ButtonBuilder } = require("discord.js");

const fightButton = new ButtonBuilder()
    .setCustomId("fight")
    .setLabel("Fight")
    .setStyle("Primary");

const runButton = new ButtonBuilder()
    .setCustomId("run")
    .setLabel("Run")
    .setStyle("Danger");

// This component returns an action row with options to fight or run.
// This is useful when you want to reuse the same action row in several commands.
// i.e. a monter fight encounter and a duel command.
module.exports = async () => {
    return new ActionRowBuilder()
        .addComponents([fightButton, runButton]);
}
```