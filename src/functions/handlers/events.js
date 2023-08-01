const { connection } = require("mongoose");
const path = require("path");

const readDirectory = require("../../util/read-directory");

module.exports = (client) => {
    client.handleEvents = async () => {
        readDirectory("./src/events").forEach(file => {
            const name = path.basename(file, ".js");
            const directoryName = path.basename(path.dirname(file));

            const event = require(path.resolve(file));
            switch (directoryName) {
                case "db":
                case "database":
                case "mongo":
                case "mongodb":
                    if (event.once)
                        connection.once(name, async (...args) => event.execute(...args, client));
                    else
                        connection.on(name, async (...args) => event.execute(...args, client));
                    break;
                default:
                    if (event.once)
                        client.once(name, async (...args) => event.execute(...args, client));
                    else
                        client.on(name, async (...args) => event.execute(...args, client));
                    break;
            }
            console.log(`🟠 Registered event ${name}.`);
        });
    }
}