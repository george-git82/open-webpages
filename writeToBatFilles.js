const fs = require("fs");
const { getLauncherData } = require("./getLauncherData");

let writeToFile = (fileName, data) => {
  let reltvFileName = `./launchers/${fileName}.bat`;
  fs.writeFile(reltvFileName, data, "utf8", (err) => {
    if (err) console.error(err);
    console.log("write to", fileName, "successful !");
  });
};

let createNwriteToBatFiles = () => {
  let launcherData = getLauncherData();
  launcherData.forEach((value, key) => {
    writeToFile(key, value);
  });
};
module.exports = { createNwriteToBatFiles };
