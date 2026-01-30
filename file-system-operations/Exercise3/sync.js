const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "source");
const targetDir = path.join(__dirname, "target");

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
}

// Read source directory
fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error("Error reading source directory:", err.message);
    return;
  }

  files.forEach((file) => {
    const sourceFile = path.join(sourceDir, file);
    const targetFile = path.join(targetDir, file);

    fs.stat(sourceFile, (err, sourceStat) => {
      if (err) {
        console.error("Error reading source file:", err.message);
        return;
      }

      fs.stat(targetFile, (err, targetStat) => {
        // File does not exist in target → copy
        if (err) {
          copyFile(sourceFile, targetFile);
        } 
        // File exists → check modified time
        else if (sourceStat.mtime > targetStat.mtime) {
          copyFile(sourceFile, targetFile);
        }
      });
    });
  });
});

function copyFile(src, dest) {
  fs.copyFile(src, dest, (err) => {
    if (err) {
      console.error(`Failed to copy ${path.basename(src)}:`, err.message);
    } else {
      console.log(`Synced: ${path.basename(src)}`);
    }
  });
}
