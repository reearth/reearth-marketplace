const fs = require("fs");

const ext = fs.readFileSync("./dist/reearth-marketplace-ext.js", "utf8");
const n = ext.replace(`import "react";`, "").replace(`import "react-dom";`, "");
fs.writeFileSync("./dist/reearth-marketplace-ext.js", n);
