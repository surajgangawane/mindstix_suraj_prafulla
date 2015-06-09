var fs = require ("fs");
function main(){
	console.log("STUDENT DATATBASE");
	var contents = fs.readFileSync("./database.json");
	var cont = JSON.parse(contents);
	return (cont);
}
module.exports.mai = main;