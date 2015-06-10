var fs=require("fs");
var read = require("./main.js");

var ret = read.mai();
module.exports.ret = ret;

function validate(){
	fs.stat ("database.json",function(error,stat){
	if (!error)
	{
		var len = ret.mystudnt.length;
		var i;
		for(i = 0; i < len; i++)
		{
			console.log (
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
}	
	

function write(ret){
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
}
		
	

module.exports.write = write;
module.exports.validate = validate;
