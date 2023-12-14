//Connection to our internal server
const { response } = require('express');
var mysql = require('mysql2');
var db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "seriousSql1",
    database: "mydb",
    port: 3306
});

async function getUserID(username){
    return new Promise((resolve, reject) => {
        db.query("select GetUserIDByUsername(?) as result;",[username]),function(err, result){
            if (err) throw err;
			console.log(result[0].result);
			resolve(result[0].result);
        }
    })
}

async function findGameID(Gamename){
	return new Promise((resolve, reject) => {
		db.query("SELECT find_or_insert_game(?) AS result;", [Gamename], function (err, result) {
			if (err) throw err;
			console.log(result[0].result);
			resolve(result[0].result);
		});
	});

}

// Function to fetch game data
exports.selectGames = function (response) {
    db.query("SELECT game_name, review FROM games", function (err, result, fields) {
        if (err) throw err;
        console.log("From model: " + result);
        response(result);
    });
}

// Function to fetch user data
exports.selectUsers = function (userEmail, response) {
    db.query("SELECT GetUserIDByEmail(?) as result;", [userEmail], function (err, result, fields) {
        if (err) throw err;
        console.log("From model: " + result);
        response(result);
    });
}

//function to get user name
exports.selectUserName = function(user_id, response){
    console.log("SELECT USERNAME");
    db.query("select user_name from user where user_id = ?;",[user_id],function(err, result, fields){
        if (err) throw err;
        console.log("SELECTUSERNAME : " + Object.values(result));
        response(result);
    });    
}

// function to get user password
exports.selectUserPassword = function (userID, response) {
    db.query("SELECT user_password from user where user_id = ?;", [userID], function (err, result, fields) {
        if (err) throw err;
        response(result);
    });
}

// Function to fetch game list data for a specific user
exports.selectGameList = function (userID,response) {

    db.query(
        "SELECT game_name, game_review from games_list join games on games.game_id = games_list.game_id WHERE user_id = ?",[userID],
        function (err, result, fields) {
            if (err) throw err;
            console.log("From model: " + result);
            response(result);
        }
    );
}

// Function to delete a game from the game list
exports.deleteFromGameList = async function (deleteData, response) {

	console.log("deleted game data:", deleteData);  // Add this line

	game_Id = await findGameID(deleteData.game_name);

	console.log("GAME ID: " + game_Id + ":" + deleteData.userID);

    console.log("DELETE QUERY:" , db.query(
        "DELETE FROM games_list WHERE game_id = ? AND user_id = ?",
        [game_Id, deleteData.userID],
        function (err, result, fields) {
            if (err) throw err;
            console.log("From model: " + result);
            response(result);
        }
    ));
}

// Function to update the game data in the games table
exports.updateGame = async function ( updatedData, response) {
    console.log("Updated game data:", updatedData);  // Add this line

	var gameName = updatedData.game_name;

    var userID = updatedData.userID;
    var review = updatedData.game_review;


    console.log(updatedData);
	gameId = await findGameID(gameName);

    db.query(
        "UPDATE games_list SET game_review = ? WHERE game_id = ? AND user_id = ?",
        [review, gameId, userID],
        function (err, result, fields) {
            if (err) {
                console.error(err);
                throw err;
            }

            console.log("From model: " + result);
            response(result);
        }
    );
}

// Function to add a new game to the games table
exports.addGame = async function (gameData, callback) {
    const {userID,  gameName, review} = gameData;
	var gameID = await findGameID(gameName);

	console.log("VAL: " + gameData);

    try{
		db.query("INSERT INTO games_list (user_id, game_id, game_review) VALUES (?, ?, ?)", [userID,  gameID, review], function (err, result) {
			if (err) console.error(err);
			callback(result);
		});
	}
	catch{
		console.error(err);
	}
}

//Rest get Games
exports.LoadNextGame = function(offset,response){
	
	db.query("SELECT game_name, game_id from games limit 3 offset ?", [offset*3], function(err, result){
		if (err) console.error(err);
		response(result);
	});
}

//rest get Review
exports.LoadNextReview = function(params,response){
	
	db.query("select game_review from games_list join user on games_list.user_id = user.user_id where game_id = ? and game_review <> '' limit 1 offset ?;",[params[0],parseInt(params[1])], function(err, result){
		if (err) console.error(err);
		response(result);
	});
}



//Register
exports.Register = function(data,response){
	console.log(data);

    
	db.query("SELECT InsertUser(?,?,?)", [data.email, data.user, data.hash], function(err, result){
		if (err) console.error(err);
		response(result);
	});
}

exports.LoadProfile = function(data,response){
    response(data)
}
