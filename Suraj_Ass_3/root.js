var express = require('express');
var app = express();
//Body-parser is package which is required to use body property.
var bodyparser = require('body-parser');
//mongoose package behave as a communication between mongodb and node.js.
var mongoose = require("mongoose");

//Connection estaiblish and server is my Database.

mongoose.connect('mongodb://localhost/server');

//Below is Schema of collection
var schema = new mongoose.Schema({ 
									Id : 'number',
									Firstname : 'string',
									Lastname : 'string',
									Address : 'string'
								});
//Here is model or we can say collection in mongodb language. Studentdb is my Collection in database.

var studentdb = mongoose.model('studentdb', schema);

//Returns Middleware that only parses json.
app.use(bodyparser.json());

//Action performed when create end point is hitted.
app.post('/create', function(req, res) {
		studentdb.create({  
						 	Id : req.body.Id,
					     	Firstname : req.body.Firstname,
						 	Lastname : req.body.Lastname,
							Address : req.body.address }, 
							function (err){
								if (err) 
									res.send('Failed to Created a Student database');
								else
									res.send('Created a Student database');
						});
  
});


//Action performed when read end point is hitted.
app.post('/read', function(req, res) {
	studentdb.find({Id : req.body.Id}, function(err, result){
		if (err)
			res.send('Data is not present in database');
		else
			res.send(result);
	});
	
 });


//Action performed when remove end point is hitted.
app.post('/remove', function(req, res){
	studentdb.find({ Id : req.body.Id}, function(err, result){
		if(err)
		 	res.send("Data not found");
		else if(result)
		{
			studentdb.remove( {Id : req.body.Id}, function(err){
				if (err)
					res.send("Sorry to Failed Delete Data");
				else
					res.send("Data has been successfully Deleted");
			});
		}
		else
			res.send("Data is not present in database");
					
	});
});


//Action performed when update end point is hitted.
app.post('/update',function(req,res){
	studentdb.update({Id : req.body.Id},
		{$set : {
				Firstname : req.body.Firstname,
				Lastname : req.body.Lastname,
   				Address : req.body.Address
        }},
        {upsert : true },
		function(err){
			if(err)
				res.send("Data cannot be updated");
			else
				res.send("Data has been updated");
		 });
});

module.exports = app;