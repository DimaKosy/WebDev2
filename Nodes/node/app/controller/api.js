var express = require("express");
var http = require("http");
var app = express();
var model = require('../model/select');

app.use(express.static(__dirname + "/../view"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for logging
var loggingMiddleware = function (req, res, next) {
    console.log('Request received at: ', new Date());
    next();
};

app.use(loggingMiddleware);

// Endpoint for fetching game data (GET request)
app.get('/games', function (req, res) {
    model.selectGameList(function Games(response) {
        console.log("From server:" + JSON.stringify(response));

        // Add game_id to each game object in the response
        const gamesWithId = response.map(game => ({
            ...game,
            game_name: game.game_name,
			game_review: game.game_review
        }));

        res.send(gamesWithId);
    });
});

// Endpoint for adding game data (POST request)
app.post('/game', function (req, res) {
    var newData = req.body;

	console.log("Adding");

    model.addGame(newData, function (response) {
        console.log("Added game data: " + JSON.stringify(response));
        res.send(response);
    });
});

// Endpoint for updating game data (PUT request)
app.put('/games/:id', function (req, res) {
    var updatedData = req.body;

	console.log("updating: " + updatedData);

    model.updateGame(updatedData, function (response) {
        console.log("Updated game data: " + JSON.stringify(response));
        res.send(response);
    });
});

// Endpoint for deleting game data (DELETE request)
app.delete('/games/:id', function (req, res) {
    var deleteData = req.body;

	console.log("DELETING: " + deleteData);

    model.deleteFromGameList(deleteData, function (response) {
        console.log("Deleted game data: " + JSON.stringify(response));
        res.send(response);
    });
});


app.get('/allgames/:offset', function(req, res){
	model.LoadNextGame(req.params.offset, function(response){
		res.send(response);
	});
});

http.createServer(app).listen(8080);
