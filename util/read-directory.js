const fs = require("fs");

// Reads all files in a directory including subdirectories and returns an array of file paths
module.exports = (dir) => {
    const readFiles = (dir) => {
        const read = [];
        const files = fs.readdirSync(dir);

        files.forEach((file) => {
            const filePath = `${dir}/${file}`;
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                readFiles(filePath); // Recursive call for subdirectories
            } else {
                if (file.endsWith(".js")) {
                    read.push(filePath);
                }
            }
        });

        return read;
    };

    return readFiles(dir);
};