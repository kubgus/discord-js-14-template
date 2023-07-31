module.exports = (client) => {
    readDirectory("./src/components").forEach(file => {
        const command = registerCommand(file);
        client.commands.set(command.data.name, command);
        console.log(`🔵 Registered command ${command.data.name}.`);
    });
}