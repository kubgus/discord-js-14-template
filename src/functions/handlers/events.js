const path = require("path");

const readDirectory = require("../../util/read-directory");

module.exports = (client) => {
    readDirectory("./src/events").forEach(file => {
        const name = path.basename(file, ".js");
        const directoryName = path.basename(path.dirname(file));

        switch (directoryName) {
            case "db":
                break;
            default:
                const event = require(path.toNamespacedPath(file))
                if (event.once)
                    client.once(name, async (...args) => event.execute(...args, client));
                else
                    client.on(name, async (...args) => event.execute(...args, client));
                break;
        }
        console.log(`🟠 Registered event ${name}.`);
    });
}