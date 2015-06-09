// this code is
// 1. Indented
// 2. Properly Commented
// 3. Modularized
// 4. Validated, checking whether JSON file exists or not
// 5. Using variables as least as possible, including in jsonFunctions.js & rtfFunctions.js

//importing i/o file system
var fs = require("fs");

// importing the file that contains all the json related functionality
var jsonFunctions = require("./jsonFunctions.js");

// importing the file that contains all the textfile related functionality
var rtfFunctions = require("./rtfFunctions.js");

var jsonData;
var len;

try
{
    stats = fs.lstatSync('student.json');
    if (stats.isFile())
    {
		printLine();
		console.log("Initially, JSON Object contains : ");
		jsonData = jsonFunctions.printJSON(fs);
		printLine();

		console.log("Writing JSON's data to textfile...");
		rtfFunctions.writeRTF(jsonData, fs);
		printLine();

		console.log("After Writing, textfile File Contains : ");
		rtfFunctions.printRTF(fs);
		printLine();

		console.log("Now, sorting the json object.");
		jsonFunctions.sortJSON(fs);
		printLine();

		console.log("Sorted JSON Obejct : ");
		jsonData = jsonFunctions.printJSON(fs);
		printLine();

		console.log("Writing sorted JSON object to textfile...");
		rtfFunctions.writeRTF(jsonData, fs);
		printLine();

		console.log("Now, text file contains sorted elements as follows : ");
		rtfFunctions.printRTF(fs);
		printLine();

		console.log("Now, Converting the sorted JSON Object to XML : ");
		printLine();
		jsonFunctions.convertJSON_TO_XML(fs);
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
