var express = require("express");
var http = require("http");
var app = express();

var model = require('../model/select');

app.use(express.static(__dirname + "/../view"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

http.createServer(app).listen(8080);

// Middleware for logging
var loggingMiddleware = function (req, res, next) {
    console.log('Request received at: ', new Date());
    next();
};

app.use(loggingMiddleware);

// Endpoint for fetching game data (GET request)
app.get('/games', function (req, res) {
    model.selectGames(function Games(response) {
        console.log("From server:" + JSON.stringify(response));
        res.send(response);
    });
});

// Endpoint for adding game data (POST request)
app.post('/games', function (req, res) {
    // Extract data from the request body
    var newData = req.body;

    // Use your model function to add the data to your database
    model.addGame(newData, function (response) {
        console.log("Added game data: " + JSON.stringify(response));
        res.send(response);
    });
});

// Endpoint for updating game data (PUT request)
app.put('/games/:id', function (req, res) {
    var id = req.params.id;
    var updatedData = req.body;

    // Use your model function to update the data in your database
    model.updateGame(id, updatedData, function (response) {
        console.log("Updated game data: " + JSON.stringify(response));
        res.send(response);
    });
});



// Endpoint for deleting game data (DELETE request)
app.delete('/games/:id', function (req, res) {
    var id = req.params.id;

    // Use your model function to delete the data from your database
    model.deleteGame(id, function (response) {
        console.log("Deleted game data: " + JSON.stringify(response));
        res.send(response);
    });
});
