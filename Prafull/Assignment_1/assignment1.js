//importing i/o file system
var fs = require("fs");

//importing js2xmlparse to convert JSON into xml
var js2xmlparser = require("js2xmlparser");


/*
reading json
*/
var jsonData = JSON.parse(fs.readFileSync("student.json")); // parsing json object into javascript
var i = 0; // used as a loop counter
var len = jsonData.students.length; // calculating the length of student array here
console.log("Initially, JSON Object contains : ");
for(i = 0; i<len; i++)
{
	console.log(jsonData.students[i].Id + " " + jsonData.students[i].Firstname + " " + jsonData.students[i].Lastname + " " + jsonData.students[i].Score);
}
console.log("----------------------------------------------------------------");


/*
writing it to destination.rtf
*/
console.log("Writing JSON's data to text file...");
var rtfData = ""; // used to store data from textfile
var tempSTR = "Id  |  Firstname  |  Lastname  |  Score";
fs.writeFileSync("destination.rtf", tempSTR); // writing the labels as a static string
for(i = 0; i < len; i++) // writing the json data to textfile using this loop
{
	rtfData = fs.readFileSync("destination.rtf");
	fs.writeFileSync("destination.rtf", rtfData + "\n" + jsonData.students[i].Id + "  |  " + jsonData.students[i].Firstname + "  |  " + jsonData.students[i].Lastname + "  |  " + jsonData.students[i].Score);
}
console.log("----------------------------------------------------------------");


/*
Printing the final contents of file
*/
var finalRtfData = fs.readFileSync("destination.rtf");
console.log("After Writing, RTF File Contains : \n" + finalRtfData);
console.log("----------------------------------------------------------------");



/*
sorting the data
*/
console.log("Now, sorting the json object.");
console.log("----------------------------------------------------------------");
console.log("Sorted JSON Obejct : ");
var j; // used as an inner loop counter
var tempObj;
for(i = 0; i < (len - 1); i++)
{
	for(j = (i+1); j < len; j++)
	{
		if(jsonData.students[i].Score < jsonData.students[j].Score)
		{
			// swapping the json object to sort in descending order
			tempObj = jsonData.students[i];
			jsonData.students[i] = jsonData.students[j];
			jsonData.students[j] = tempObj;
		}
	}
}
for(i = 0; i<len; i++)
{
	console.log(jsonData.students[i].Id + " " + jsonData.students[i].Firstname + " " + jsonData.students[i].Lastname + " " + jsonData.students[i].Score);
}
console.log("----------------------------------------------------------------");


/*
writing sorted object again to textfile i.e. destination.rtf
*/
console.log("Writing sorted JSON object to textfile...");
console.log("----------------------------------------------------------------");
fs.writeFileSync("destination.rtf", tempSTR);
for(i = 0; i < len; i++)
{
	rtfData = fs.readFileSync("destination.rtf");
	fs.writeFileSync("destination.rtf", rtfData + "\n" + jsonData.students[i].Id + "  |  " + jsonData.students[i].Firstname + "  |  " + jsonData.students[i].Lastname + "  |  " + jsonData.students[i].Score);
}

/*
Printing the final sorted contents of file
*/
finalRtfData = fs.readFileSync("destination.rtf");
console.log("Now, text file contains sorted elements as follows : \n" + finalRtfData);

console.log("----------------------------------------------------------------");
console.log("Now, Converting the sorted JSON Object to XML : ");
var stream = fs.createWriteStream("destination.xml");
var arr;
stream.once('open',function(fd){
	var xml = js2xmlparser("students", jsonData);
	stream.write(xml);
	stream.end();
});

console.log("----------------------------------------------------------------");
console.log("JSON object sucessfully converted to XML.");
console.log("----------------------------------------------------------------");