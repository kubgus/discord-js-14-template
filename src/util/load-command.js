const { SlashCommandBuilder } = require("discord.js");
const path = require("path");

// Returns an object containing the command data, execute function, and cooldown
module.exports = (file) => {
    const {
        data = new SlashCommandBuilder(),
        execute,
        cooldown = 0,
        public = false, // Determines whether the command can be used outside of the debug guild
    } = require(path.resolve(`${file}`));

    if (!data.name) {
        data.setName(path.basename(file, ".js"));
    }

    if (!data.description) {
        data.setDescription("Press ENTER to execute this command.");
    }

    return { data, execute, cooldown, public };
}
