exports.selectGames = function(response){

	var mysql = require('mysql2');

	var con = mysql.createConnection({ // change these details to match your installation
	  host: "localhost",
	  user: "root",
	  password: "1234", 
	  database: "sys",
	  port:3306
	});

	con.connect(function(err) {
	  if (err) throw err;
	  con.query("SELECT game_name FROM games", function (err, result, fields) { // change the query to match your needs and setup
		if (err) throw err;
		console.log("From model: " + result);
		response(result);		
		
	  });
	});
}

exports.selectUsers = function(response){

	var mysql = require('mysql2');

	var con = mysql.createConnection({ // change these details to match your installation
	  host: "localhost",
	  user: "root",
	  password: "1234", 
	  database: "sys",
	  port:3306
	});

	con.connect(function(err) {
	  if (err) throw err;
	  con.query("SELECT user_name FROM games", function (err, result, fields) { // change the query to match your needs and setup
		if (err) throw err;
		console.log("From model: " + result);
		response(result);		
		
	  });
	});
}

exports.selectGameList = function(response){

	var mysql = require('mysql2');

	var con = mysql.createConnection({ // change these details to match your installation
	  host: "localhost",
	  user: "root",
	  password: "1234", 
	  database: "sys",
	  port:3306
	});

	con.connect(function(err) {
	  if (err) throw err;
	  con.query(
		"SELECT game_name FROM games join games_list on games_list.game_id = games.game_id where user_id = ?"[userID]
		, function (err, result, fields) { // change the query to match your needs and setup
		if (err) throw err;
		console.log("From model: " + result);
		response(result);		
		
	  });
	});
}