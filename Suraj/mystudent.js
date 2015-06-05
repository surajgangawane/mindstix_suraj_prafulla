var fs = require("fs");
console.log("STUDENT DATABASE");
var contents = fs.readFileSync("student.json");
var cont = JSON.parse(contents);

//console.log("contents : ",contents);
var i=0;
console.log("FirstName" + "|" + "LastName" + "|" + "Score");
var len = cont.mystudnt.length;

				for(i=0;i<len;i++)
				{
					console.log(cont.mystudnt[i].Firstname + "|" +
								cont.mystudnt[i].Lastname + "|" +
		  						cont.mystudnt[i].Score
								);
				}
//fs.writeFileSync("destination.txt","Firstname|Lastname|Score");
var stream = fs.createWriteStream("destination.txt");
stream.once('open',function(fd){
	stream.write("Id":1,"FirstName" + "|" + "LastName" + "|" + "Score" );
	for(i=0;i<len;i++)
	{
		stream.write(
					cont.nystudnt[i].Id + "|" +
					cont.mystudnt[i].Firstname + "|" +
					cont.mystudnt[i].Lastname + "|" +
					cont.mystudnt[i].Score);
	}
	stream.end();
});