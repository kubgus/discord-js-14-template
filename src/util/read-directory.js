const fs = require("fs");

// Reads all files in a directory including subdirectories and returns an array of file paths
module.exports = (dir, fileExtension = ".js") => {
    const read = [];

    const readFiles = (dir) => {
        const files = fs.readdirSync(dir);

        files.forEach((file) => {
            const filePath = `${dir}/${file}`;
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                readFiles(filePath); // Recursive call for subdirectories
            } else {
                if (file.endsWith(fileExtension)) {
                    read.push(filePath);
                }
            }
        });
    };

    readFiles(dir)
    return read;
};