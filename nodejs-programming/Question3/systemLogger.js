const os = require("os");
const fs = require("fs");
const path = require("path");
const logFile = path.join(__dirname, "system.log");

function logSystemInfo() {
    const cpuInfo = os.cpus().length;         
    const totalMemory = os.totalmem();         
    const freeMemory = os.freemem();          
    const platform = os.platform();            
    const time = new Date().toLocaleString();

    const logData = `
    Time: ${time}
    Platform: ${platform}
    CPU Cores: ${cpuInfo}
    Total Memory: ${totalMemory}
    Free Memory: ${freeMemory}`;

    fs.appendFile(logFile, logData, (err) => {
        if (err) {
            console.error("Error writing log:", err);
        }
    });
}

setInterval(logSystemInfo, 5000);
