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
			response.end("Sorry, Page not found.");
		}
		else
		{
			/*
				originally the url consists filename with '/' by default in the beginning. e.g. '/logo.png'. We require only 'logo.png' to pass it
				as a filename to createReadStream(). So, for that, we can use replace function which replaces '/' with nothing ('') and simply
				pass the intended filename to the createReadStream().
			*/

			console.log("By default, filename : " + request.url); // this line proves the filename consists '/' by default in the beginning.
			var filename = (request.url).replace('/',''); // replacing '/' with nothing to get the required filename

			fs.exists(filename, function(exists){
				if(exists){
					var img = fs.readFileSync('./' + filename);
				    response.writeHead(200, {'Content-Type': 'image/png' });
				    response.end(img, 'binary');

				    var file = fs.createReadStream(filename); // trying to provide the required filename entered by user
					var newFile = fs.createWriteStream("./Download/" + "new_" + filename); // writing the file with new file name
					file.pipe(newFile);
					request.on('end', function(){
						response.end("Image copied successfully.");
					});
				}
				else
				{
					// if file doesn't exists
					response.writeHead(400, {"Content-type":"text/plain"});
					response.end("Sorry, Bad Request.");
				}
			});
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