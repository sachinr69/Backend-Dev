const fs = require("fs");
const readline = require("readline");
const path = require("path");

const logFilePath = path.join(__dirname, "app.log");

// Counters
let totalLines = 0;
let infoCount = 0;
let warnCount = 0;
let errorCount = 0;

// Read file as stream
const readStream = fs.createReadStream(logFilePath, {
  encoding: "utf-8"
});

// Read line by line
const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity
});

rl.on("line", (line) => {
  totalLines++;

  if (line.includes("INFO")) {
    infoCount++;
  } else if (line.includes("WARN")) {
    warnCount++;
  } else if (line.includes("ERROR")) {
    errorCount++;
  }
});

rl.on("close", () => {
  console.log("Log File Summary Report");
  console.log("Total Entries :", totalLines);
  console.log("INFO Count    :", infoCount);
  console.log("WARN Count    :", warnCount);
  console.log("ERROR Count   :", errorCount);
});
