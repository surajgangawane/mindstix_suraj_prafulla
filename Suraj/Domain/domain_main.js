var fs = require ("fs");
var domain = require ("domain");
var d = domain.create();

d.on('error',function(err){
	console.log("Error in main");
});

function main(){
	d.run(function(){
		process.nextTick(function(){
			console.log("STUDENT DATATBASE");
			var contents = fs.readFileSync("./database.json");
			var cont = JSON.parse(contents);
			//console.log(cont);
			return (cont);
		});
	});
}
main();
module.exports.mai = main;