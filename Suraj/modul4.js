var js2xmlparser = require("js2xmlparser");
var fs = require("fs");
var f = require("./modul3.js");
var set = f.let;
var get = f.desc(set);
console.log(get);
var xml = js2xmlparser("student", get);
fs.writeFileSync("dest.xml",xml);