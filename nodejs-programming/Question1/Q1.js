const fs = require("fs");
const path = require("path");
const inputFile = path.join(__dirname, "input.txt");
const outputFile=path.join(__dirname, "output.txt");

fs.readFile(inputFile, "utf-8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    const words = data.trim().split(/\s+/);
    const wordCount = data.trim() === "" ? 0 : words.length;
    const result = `Total Words: ${wordCount}`;

    fs.writeFile(outputFile, result, (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return;
        }
        console.log("Word count written successfully!");
    });
});
