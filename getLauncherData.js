const path = require("path");
const fs = require("fs");
const folderPath = "./browserUrlList";

let chromeCmdTemplate = "start chrome ";
let edgeCmdTemplate = "start msedge ";
let firefoxCmdTemplate = "start firefox ";
let newWinCmdTemplate = "--start-maximized --new-window ";

let launcherNameArr = ["launchChrome", "launchEdge", "launchFirefox"];
let strData = "";
let mapUrl = new Map();
let launcherDataMap = new Map();

let arrfiles = fs.readdirSync(folderPath).map((fileName) => {
  return path.join(folderPath, fileName);
});

// Read file content
let getUrlList = () => {
  let content;
  arrfiles.forEach((fpath) => {
    content = fs.readFileSync(fpath, "utf8");
    mapUrl.set(
      path.basename(fpath).replace(".txt", ""),
      content.split(/\r?\n/)
    );
  });
  return mapUrl;
};

let setLauncherData = (arr, indx, cmdTemplate) => {
  let count = 0;
  let launcherName = launcherNameArr[indx];
  strData = "";
  arr.forEach((each, index) => {
    if (each !== "") {
      // strData += "\n" + cmdTemplate + each;

      if(strData == ""){
        strData += "\n" + cmdTemplate + newWinCmdTemplate + "\"" + each + "\"";
      }else {
        strData += "\n" + cmdTemplate + "\"" + each + "\"";
      }
      launcherDataMap.set(launcherName + count, strData);
    } else {
      strData = "";
      count++;
    }
  });
};

let formatData = () => {
  mapUrl.forEach((value, key) => {
    if (key === "chromeUrlList") {
      setLauncherData(value, 0, chromeCmdTemplate);
    } else if (key === "edgeUrlList") {
      setLauncherData(value, 1, edgeCmdTemplate);
    } else if (key === "firefoxUrlList") {
      setLauncherData(value, 2, firefoxCmdTemplate);
    } else {
      console.error(
        `file: ${key}.txt not registered in launchers: ${launcherNameArr}`
      );
    }
  });
};

// main function
let getLauncherData = () => {
  getUrlList();
  formatData();
  return launcherDataMap;
};

module.exports = { getLauncherData };
