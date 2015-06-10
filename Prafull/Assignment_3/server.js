// importing http module to create server
var http = require("http");

// importing file i/o module to access file read & write functionalities
var fs = require("fs");

// reading & parsing the json object stored in external file
var config = JSON.parse(fs.readFileSync("config.json"));
var host = config.host;
var port = config.port;

// creating http server
var server = http.createServer(function(request, response) {
	console.log("Received Request : " + request.url);

	fs.readFile("./" + request.url, function(error, data){
		if(error)
		{
			// this code will get execute if user enters any bad filename
			response.writeHead(404, {"Content-type":"text/plain"});
			response.end("Sorry, Image not found.");
		}
		else
		{
			var img = fs.readFileSync('.' + request.url);
		    response.writeHead(200, {'Content-Type': 'image/png' });
		    response.end(img, 'binary');
		    var f = request.url;
			var f1 = f.replace('/', ''); // trying to remove initial '/' from the request.url, exists by default
		    var file = fs.createReadStream(f1); // trying to provide the filename entered by user
			var newFile = fs.createWriteStream("./Download/" + "new_" + f1); // providing new file name
			file.pipe(newFile);
		}
	});
});


// Displaying which host & port we are currently accessing
server.listen(port, host, function(){
	console.log("Listenting : " + host + ":" + port);
});


// keeping an eye on the json, whether any updations are happening with it
fs.watchFile("config.json", function(){
	config = JSON.parse(fs.readFileSync("config.json"));
	host = config.host;
	port = config.port;
	server.close();
	server.listen(port, host, function(){
		console.log("Listenting : " + host + ":" + port);
	});
});