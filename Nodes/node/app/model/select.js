exports.selectData = function(response){

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
	  con.query("SELECT id FROM Education", function (err, result, fields) { // change the query to match your needs and setup
		if (err) throw err;
		console.log("From model: " + result);
		response(result);		
		
	  });
	});
}

exports.selectEdu = function(response){

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
	  con.query("SELECT * FROM Education", function (err, result, fields) { // change the query to match your needs and setup
		if (err) throw err;
		console.log("From model: " + result);
		response(result);		
		
	  });
	});
}