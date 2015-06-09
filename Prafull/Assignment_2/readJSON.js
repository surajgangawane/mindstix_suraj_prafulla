// read.json
module.exports = {
	readJSON : function()
	{
		/* 
		reading json
		*/
		jsonData = JSON.parse(fs.readFileSync("student.json")); // parsing json object into javascript
	}
};