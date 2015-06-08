var js2xmlparser = require("js2xmlparser");
var fs=require("fs");
console.log("STUDENT DATABASE");
var contents = fs.readFileSync("student.json");
var cont = JSON.parse(contents);
var j=0;
var i=0;

len=cont.mystudnt.length;

var stream = fs.createWriteStream("destination3.xml");
var arr;
stream.once('open',function(fd){

	
	for(i=0;i<len;i++)
	{
		for(j=i+1;j<len;j++)
		{
			if(cont.mystudnt[i].Score < cont.mystudnt[j].Score)
			{
					arr=cont.mystudnt[j];
					cont.mystudnt[j]=cont.mystudnt[i];
					cont.mystudnt[i]=arr;
			}
	    }
	}
	var xml = js2xmlparser("student", cont);
	stream.write(xml);
	stream.end();
});	
