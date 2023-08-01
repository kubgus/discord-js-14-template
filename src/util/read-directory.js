const fs = require("fs");

// Reads all files in a directory including subdirectories and returns an array of file paths
module.exports = (dir, fileExtension = ".js") => {
    const read = [];
    const readFiles = (dir) => {
        fs.readdirSync(dir).forEach((file) => {
            const filePath = `${dir}/${file}`;
            if (fs.statSync(filePath).isDirectory())
                readFiles(filePath); // Recursive call for subdirectories
            else
                if (file.endsWith(fileExtension))
                    read.push(filePath);
        });
    };

    readFiles(dir)
    return read;
};