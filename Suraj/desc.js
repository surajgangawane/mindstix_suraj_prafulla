var fs=require("fs");
console.log("STUDENT DATABASE");
var contents = fs.readFileSync("student.json");
var cont = JSON.parse(contents);

//console.log("contents : ",contents);
var i=0;
//console.log("FirstName" + "|" + "LastName" + "|" + "Score");
var len = cont.mystudnt.length;

				// for(i=0;i<len;i++)
				// {
				// 	console.log(cont.mystudnt[i].Firstname + "|" +
				// 				cont.mystudnt[i].Lastname + "|" +
		  // 						cont.mystudnt[i].Score
				// 				);
				// }
//fs.writeFileSync("destination.txt","Firstname|Lastname|Score");
var j=0;


var stream = fs.createWriteStream("destination2.txt");
var arr;
stream.once('open',function(fd){

	stream.write("FirstName" + "|" + "LastName" + "|" + "Score" );
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
	    stream.write(cont.mystudnt[i].Firstname + "|" +
					cont.mystudnt[i].Lastname + "|" +
					cont.mystudnt[i].Score);

	}
	// for(i=0;i<len;i++)
	// {
	// 				stream.write(cont.mystudnt[i].Firstname + "|" +
	// 				cont.mystudnt[i].Lastname + "|" +
	// 				cont.mystudnt[i].Score);
	// }
	stream.end();
});