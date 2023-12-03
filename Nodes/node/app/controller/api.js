var express = require("express");
var http = require("http");
var app = express();

var model = require('../model/select');

app.use(express.static(__dirname + "/../view"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

http.createServer(app).listen(8080);


var cb1 = function (req, res, next) {
	console.log('Handler 1');
	//next('route'); 	// bypass all the handlers indicated in the array and go to the next route, app.get('/users', function (req, res){
	next(); 			// call the next handler in the array, cb2	
}

var cb2 = function (req, res, next) {
	console.log('Handler 2');
	next();
}


app.get('/userList/:userID', function (req, res) {
	model.selectGameList(function GamesList(response){			
			console.log("From server:" + JSON.stringify(response));
			res.send(response);
		});
});

