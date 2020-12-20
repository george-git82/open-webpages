// const cliProgress = require('cli-progress');
const { createNwriteToBatFiles } = require("./writeToBatFilles");
const { launchBrowsers } = require("./browserLauncher");

let mode = false;

// command-line args
if(process.argv.length > 2 && process.argv[2] !== undefined){
  if(process.argv[2] === "true"){
    console.log("Script running in test mode, will create and NOT run the .bat files in ./launchers.\n");
    mode = true;
  }
}

createNwriteToBatFiles();

let intrvl = setInterval(() => {
  process.stdout.write("*");
}, 50);

setTimeout(() => {
  clearTimeout(intrvl);
  console.log("*");
  launchBrowsers(mode);
}, 2000);
