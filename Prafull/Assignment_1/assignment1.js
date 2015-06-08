// this code is
// 1. Indented
// 2. Properly Commented
// 3. Modularized
// 4. Validated, checking whether JSON file exists or not

//importing i/o file system
var fs = require("fs");

//importing js2xmlparse to convert JSON into xml
var js2xmlparser = require("js2xmlparser");

var jsonData;
var len;

try
{
    stats = fs.lstatSync('student1.json');
    if (stats.isFile())
    {
        readJSON();

		printLine();
		console.log("Initially, JSON Object contains : ");
		printJSON();
		printLine();

		console.log("Writing JSON's data to textfile...");
		writeRTF();
		printLine();

		console.log("After Writing, textfile File Contains : ");
		printRTF();
		printLine();

		console.log("Now, sorting the json object.");
		sortJSON();
		printLine();

		console.log("Sorted JSON Obejct : ");
		printJSON();
		printLine();

		console.log("Writing sorted JSON object to textfile...");
		writeRTF();
		printLine();

		console.log("Now, text file contains sorted elements as follows : ");
		printRTF();
		printLine();

		console.log("Now, Converting the sorted JSON Object to XML : ");
		printLine();
		convertJSON_TO_XML();
		console.log("JSON object sucessfully converted to XML.");
		printLine();

    }    
}
catch (e) {
    console.log("Sorry, JSON Object file does not exists.");
}



function printLine()
{
	console.log("----------------------------------------------------------------");
}

function readJSON()
{
	/* 
	reading json
	*/
	jsonData = JSON.parse(fs.readFileSync("student.json")); // parsing json object into javascript
}

function printJSON()
{
	len = jsonData.students.length; // calculating the length of student array here
	for(var i = 0; i<len; i++)
	{
		console.log(jsonData.students[i].Id + " " + jsonData.students[i].Firstname + " " + jsonData.students[i].Lastname + " " + jsonData.students[i].Score);
	}
}

function writeRTF()
{
	/*
	writing it to destination.rtf
	*/
	var headerStr = "Id  |  Firstname  |  Lastname  |  Score";
	// fs.writeFileSync("destination.rtf", headerStr); // writing the header as a static string
	// for(i = 0; i < len; i++) // writing the json data to textfile using this loop
	// {
		//rtfData = fs.readFileSync("destination.rtf");
		//fs.writeFileSync("destination.rtf", rtfData + "\n" + jsonData.students[i].Id + "  |  " + jsonData.students[i].Firstname + "  |  " + jsonData.students[i].Lastname + "  |  " + jsonData.students[i].Score);
	//}

	// instead of reading-writing circle, just appending data to the destination file using following code
	fs.writeFileSync("destination.rtf", headerStr);
	for(var i = 0; i< len; i++)
	{
		// Write the data to stream with encoding to be utf8
		var data = "\n " + jsonData.students[i].Id + "  |  " + jsonData.students[i].Firstname + "  |  " + jsonData.students[i].Lastname + "  |  " + jsonData.students[i].Score;
		fs.appendFileSync('destination.rtf', data);	
	}	
}

function printRTF()
{
	/*
	Printing the final contents of file
	*/
	var finalRtfData = fs.readFileSync("destination.rtf");
	console.log("\n" + finalRtfData);
}


function sortJSON()
{
	/*
	sorting the data
	*/
	var tempObj;
	for(var i = 0; i < (len - 1); i++)
	{
		for(var j = (i+1); j < len; j++)
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
	// for(i = 0; i<len; i++)
	// {
	// 	console.log(jsonData.students[i].Id + " " + jsonData.students[i].Firstname + " " + jsonData.students[i].Lastname + " " + jsonData.students[i].Score);
	// }
}

function convertJSON_TO_XML()
{
	var stream = fs.createWriteStream("destination.xml");
	var arr;
	stream.once('open',function(fd){
		var xml = js2xmlparser("students", jsonData);
		stream.write(xml);
		stream.end();
	});
}