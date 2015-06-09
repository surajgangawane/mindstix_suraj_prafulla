// this module contains all the function related to JSON

//importing js2xmlparse to convert JSON into xml
var js2xmlparser = require("js2xmlparser");

var jsonData;
var len;

module.exports = {

	// this function reads & prints the json object
	printJSON : function(fs)
	{
		jsonData = JSON.parse(fs.readFileSync("student.json")); // parsing json object into javascript
		len = jsonData.students.length; // calculating the length of student array here
		for(var i = 0; i<len; i++)
		{
			console.log(jsonData.students[i].Id + " " + jsonData.students[i].Firstname + " " + jsonData.students[i].Lastname + " " + jsonData.students[i].Score);
		}
		return jsonData;
	},

	// this function sorts the json object
	sortJSON : function(fs)
	{
		var tempObj; // this object is used as a temporary to just swap the JSON objects
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
	},

	// this function converts the JSON file into xml
	convertJSON_TO_XML : function(fs)
	{
		var stream = fs.createWriteStream("destination.xml");
		var arr;
		stream.once('open',function(fd){
			var xml = js2xmlparser("students", jsonData);
			stream.write(xml);
			stream.end();
		});
	}
};