var fs=require("fs");
var read = require("./main.js");

var domain = require('domain');
var d1 = domain.create();
var d2 = domain.create();


var ret = read.mai();
module.exports.ret = ret;

d2.on('error',function(err){
	console.log("Error in write");
})

d1.on('error',function(err){
	console.log("Error in validate");
});

function validate(){
	d1.run(function(){
		process.nextTick(function(){
			fs.stat ("database.json",function(error,stat){
			if (!error)
			{
				var len = ret.mystudnt.length;
				var i;
				for(i = 0; i < len; i++)
				{
					console.log(
								ret.mystudnt[i].Firstname + "|" +
								ret.mystudnt[i].Lastname + "|" +
								ret.mystudnt[i].Score
							);
				}
				write(ret);
			}

			else
			{
				console.log("File does not exist");
			}
		});
	});
});
}	
	

function write(ret){
	d2.run(function(){
		process.nextTick(function(){
			var stream = fs.createWriteStream ("destination4.txt");
			stream.once ('open',function(fd){
			stream.write("Id" + "|" +"FirstName" + "|" + "LastName" + "|" + "Score" );
			console.log(ret);
			var len = ret.mystudnt.length;
			for(i=0; i < len; i++)                
			{
				stream.write(
								ret.mystudnt[i].Id + "|" +
								ret.mystudnt[i].Firstname + "|" +
								ret.mystudnt[i].Lastname + "|" +
								ret.mystudnt[i].Score
							);
			}
			stream.end();
		});
	});
});
}
		
	
module.exports.write = write;
module.exports.validate = validate;
