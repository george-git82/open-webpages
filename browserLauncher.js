const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

let launchBrowsers = (test) => {
  let launchersPath = path.join(".\\", "launchers");

  let launchers = fs.readdirSync(launchersPath).map((fileName) => {
    return path.join(launchersPath, fileName).toString();
  });

  launchers = launchers.map((each) => {
    return "./" + each.replace("\\", "/");
  });

  launchers.forEach((each) => {
    each = '"' + each + '"';
    console.log(`launching ${each}`);

    if (!test) {
      setTimeout(() => {
        exec(each, (err, data) => {
          if(err) console.error(err);
          console.log(data.toString());
        });
      }, 200);
    }
  });
};

module.exports = { launchBrowsers };
