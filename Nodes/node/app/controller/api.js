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
    saveUninitialized: true, // choosing false is useful for login sessions
    cookie: { maxAge: 60000 } // milliseconds to expire
}));

const saltRounds = 10;

app.post("/login", async function(req, res){
    var user = req.body.emailInput;
    var pwd = req.body.pwdInput;

    console.log(req.session.user);

    //user = validator.blacklist(user, '/\{}:;'); // missing  ' and "" for full JSON sanitization
    // don't edit the pwd, it will not be inserted plain in the DB, no risk of code injection

    console.log("user: " + user + " pwd: " + pwd);

    bcrypt.hash(pwd, saltRounds, function(err, hash) { // every time you calculate an hash it will be different, but match the same origin
        console.log("hashed: " + hash);
    });

    //Query password
    var userID = await new Promise((resolve, reject)=>{
        model.selectUsers(user, function(response){
            console.log("UID: " + Object.values(response[0])[0]);
            resolve(Object.values(response[0])[0]);
        })
    });

    console.log("GET PWD: " + userID);
    var userPwd = await new Promise((resolve, reject)=>{
        model.selectUserPassword(userID, function(response){
            console.log("PWD: " + Object.values(response[0])[0]);
            resolve(Object.values(response[0])[0]);
        })
    });

    bcrypt.compare(pwd, userPwd, function(err, result) {
  		if(result) {
            console.log("Welcome");
            req.session.user = "null";
            req.session.user_id = userID;
            return res.redirect("/profile.html");
        } else {
            // Passwords don't match
            console.log("Sorry.");
            res.send("Invalid details");
        } 
    });

});

app.post("/register", async function(req, res) {
    var user = req.body.nameInput;
    var email = req.body.emailInput;
    var pwd = req.body.pwdInput;

    user = validator.blacklist(user, '/\{}:;'); // missing  ' and "" for full JSON sanitization
        // don't edit the pwd, it will not be inserted plain in the DB, no risk of code injection

    console.log("user: " + user + " pwd: " + pwd);

    hash = await new Promise((resolve, reject) => { 
            bcrypt.hash(pwd, saltRounds, function(err, hash) { // every time you calculate an hash it will be different, but match the same origin
            console.log("hashed: " + hash);
            resolve(hash);
        });
    });


    data = {user, email, hash};
    req.session.user_id = await new Promise((resolve, reject)=>{
        model.Register(data, function(response){
            console.log(Object.values(response[0])[0]);
            resolve(Object.values(response[0])[0]);
        })
    });

    console.log("register check: " + req.session.user_id);
    console.log((req.session.user_id <= 0 ));
    if(req.session.user_id <= 0 ){
        return res.send("EMAIL ALREADY REGISTERED");
    }


    req.session.user = user;
    console.log("USER:" + user);
    return res.redirect("/profile.html");
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

    userID = req.session.user_id;

    model.selectGameList(userID , function (response) {
        console.log("From server:" + JSON.stringify(response));

        // Add game_id to each game object in the response
        
        const gamesWithId = response.map(game => ({
            ...game,
            userID: req.session.user_id, 
            userName : req.session.user,
            game_name: game.game_name,
			game_review: game.game_review
        }));

        res.send(gamesWithId);
    });
});

// Endpoint for adding game data (POST request)
app.post('/game', function (req, res) {
    var newData = req.body;
    newData.userID = req.session.user_id;
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

app.get('/getReview/:offset',function(req, res){
    model.LoadNextReview(req.params.offset, function(response){
        console.log(response);
        res.send(response);
    });
});

app.post("/logout", function (req, res){
	req.session.destroy( function (err) {
		if(err) {
            return console.log(err);
        }
        res.send("You have been logged out.");
	});	
});

app.get('/profile', function(req, res){
    data = [req.session.user, ""];
    

    model.LoadProfile(data, function(response){
        res.send(response);
    });
});

app.get('/sessionVar', function(req, res){

});

app.post('/loginRedirect', function(req, res){
    return res.redirect(`/SignUp_Login.html`);
});

http.createServer(app).listen(8080);
