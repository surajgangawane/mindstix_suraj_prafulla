// this module contains all the function related to textfile
var len;

module.exports = {
	// writing json object's data to textfile
	writeRTF : function(jsonData, fs)
	{
		len = jsonData.students.length; // calculating the length of student array here
		var headerStr = "Id  |  Firstname  |  Lastname  |  Score";

		// appending data to the destination file
		fs.writeFileSync("destination.rtf", headerStr);
		for(var i = 0; i< len; i++)
		{
			var data = "\n " + jsonData.students[i].Id + "  |  " + jsonData.students[i].Firstname + "  |  " + jsonData.students[i].Lastname + "  |  " + jsonData.students[i].Score;
			fs.appendFileSync('destination.rtf', data);	
		}	
	},

	// displaying the data of textfile
	printRTF : function(fs)
	{
		var finalRtfData = fs.readFileSync("destination.rtf");
		console.log("\n" + finalRtfData);
	}
};