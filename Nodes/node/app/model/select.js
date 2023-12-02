var mysql = require('mysql2');
var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "seriousSql1",
    database: "mydb",
    port: 3306
});

// Function to fetch game data
exports.selectGames = function (response) {
    db.query("SELECT game_name, review FROM games", function (err, result, fields) {
        if (err) throw err;
        console.log("From model: " + result);
        response(result);
    });
}



// Function to fetch user data
exports.selectUsers = function (response) {
    db.query("SELECT user_name FROM games", function (err, result, fields) {
        if (err) throw err;
        console.log("From model: " + result);
        response(result);
    });
}

// Function to fetch game list data for a specific user
exports.selectGameList = function (response) {
    db.query(
        "SELECT game_name, review FROM games " +
        "JOIN games_list ON games_list.game_id = games.game_id " +
        "WHERE user_id = 1",
        function (err, result, fields) {
            if (err) throw err;
            console.log("From model: " + result);
            response(result);
        }
    );
}

// Function to delete a game from the game list
exports.deleteFromGameList = function (response) {
    db.query(
        "DELETE FROM games_list WHERE game_id = ? AND user_id = ?",
        [game_Id, user_Id],
        function (err, result, fields) {
            if (err) throw err;
            console.log("From model: " + result);
            response(result);
        }
    );
}


exports.updateGame = function (id, updatedData, response) {
    var gameName = updatedData.gameName;
    var review = updatedData.review;

    db.query(
        "UPDATE games SET game_name = ?, review = ? WHERE game_id = ?",
        [gameName, review, id],
        function (err, result, fields) {
            if (err) throw err;
            console.log("From model: " + result);
            response(result);
        }
    );
}







// Function to insert a new game into the game list
exports.InsertIntoGamesList = function (response) {
    db.query(
        "INSERT INTO games_list (review, game_id, user_id) VALUES (?, ?, ?)",
        [review, game_Id, user_Id],
        function (err, result, fields) {
            if (err) throw err;
            console.log("From model: " + result);
            response(result);
        }
    );
}

// Function to add a new game to the games table
exports.addGame = function (gameData, callback) {
    const { gameName, review } = gameData;
    const sql = "INSERT INTO games (game_name, review) VALUES (?, ?)";
    db.query(sql, [gameName, review], function (err, result) {
        if (err) throw err;
        callback(result);
    });
}
