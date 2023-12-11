var express = require("express");
var session = require('express-session');
var http = require("http");
var app = express();
var model = require('../model/select');

///////Login

var validator = require('validator');
var bcrypt = require('bcrypt');
const { resolve } = require("path");
const { redirect } = require("express/lib/response");
var path = require('path');
////////

app.use(express.static(__dirname + "/../view"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'secretSecretsecret', // used to sign the session ID cookie
    resave: false, // session NOT saved back to the store if not modified
    saveUninitialized: false, // choosing false is useful for login sessions
    cookie: { maxAge: 60000 } // milliseconds to expire
}));

const saltRounds = 10;

session.user = -1;


app.get("/login", function(req, res){
    var user = req.body.user;
    var pwd = req.body.pwd;

    console.log(req.session.user);

    user = validator.blacklist(user, '/\{}:;'); // missing  ' and "" for full JSON sanitization
    // don't edit the pwd, it will not be inserted plain in the DB, no risk of code injection

    console.log("user: " + user + " pwd: " + pwd);

    bcrypt.hash(pwd, saltRounds, function(err, hash) { // every time you calculate an hash it will be different, but match the same origin
        console.log("hashed: " + hash);
    });

    var mySavedPwd;
		
		for (i in users)
			if (users[i].username == user)
				mySavedPwd = users[i].hashed_pwd
    
        bcrypt.compare(pwd, mySavedPwd, function(err, result) {
  			if(result) {
                // Passwords match
                console.log("Logged In.");
                req.session.user = user;
                // res.redirect("/bar");
                res.send("Welcome, " + user);
            } else {
                // Passwords don't match
                console.log("Sorry.");
                res.send("Invalid details");
            } 
        });

});

app.post("/register/:username/:email/:pwd", async function(req, res){
    try{
        var user = req.params.username;
        var email = req.params.email;
        var pwd = req.params.pwd;
        var hash = pwd;
        user = validator.blacklist(user, '/\{}:;'); // missing  ' and "" for full JSON sanitization
        // don't edit the pwd, it will not be inserted plain in the DB, no risk of code injection

        console.log("user: " + user + " pwd: " + pwd);

        hash = await new Promise((resolve, reject) => { 
            bcrypt.hash(pwd, saltRounds, function(err, hash) { // every time you calculate an hash it will be different, but match the same origin
            console.log("hashed: " + hash);
            resolve(hash);
        });
        });

        console.log("user: " + user + " hash: " + hash);
        data = {user, email, hash};

        req.session.user = await new Promise((resolve, reject)=>{
            model.Register(data, function(response){
                console.log(Object.values(response[0])[0]);
                resolve(Object.values(response[0])[0]);
            })
            
        });
        
        console.log("REDIRECTING");
        console.log(path.join(__dirname, '/../view/profile.html'));
        console.log("EO REDIRECTING");
        return res.sendFile(path.join(__dirname, '/../view/profile.html'));
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/logout", function (req, res){
	req.session.destroy( function (err) {
		if(err) {
            return console.log(err);
        }
        res.send("You have been logged out.");
	});	

});

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
    console.log(req.session.user);
});

app.get("/testredirect", function(req, res) {
    while(!(req.session.user >= 0)){

    }
    console.log("USER" + req.session.user);
    //return res.redirect(`/profile.html`);
});

http.createServer(app).listen(8080);
