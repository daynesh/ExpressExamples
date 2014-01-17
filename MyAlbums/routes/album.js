var mysql = require('mysql');

var connection = mysql.createConnection({
	user: "root",
	password: "yourpassword",
	database: "zf2tutorial"
});

// Get a list of albums from the MySQL database and send back to client
exports.list = function(req, res) {
	// Query the database
	connection.query('SELECT * FROM album;', function (error, rows, fields) {
		// Header
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		// Payload
		res.end(JSON.stringify(rows));
	});
};

exports.add = function(req, res) {
	var artist = req.body.artist,
		title = req.body.title;

	console.log('Adding Artist: %s, Title: %s', artist, title);

	var post = {artist: artist, title: title};
	connection.query('INSERT INTO album SET ?', post, function(err, result) {

		// Display list of all albums back to user
		exports.list(req, res);
	});
};

exports.delete = function(req, res) {
	var id = req.params.id;

	console.log('Deleting id: %s', id);	

	connection.query('DELETE FROM album WHERE ?', {id: id}, function(err, result) {
		if (err) 
			throw err;
		
		// Display list of all albums back to user
		exports.list(req, res);
	});
};

exports.edit = function(req, res) {
	var id = req.params.id,
		artist = req.body.artist,
		title = req.body.title;

	console.log('Updated id: %s, Artist: %s, Title: %s', id, artist, title);

	connection.query('UPDATE album SET ? WHERE ?', [{artist: artist, title: title}, {id: id}], function(err, result) {
		if (err) 
			throw err;
		
		// Display list of all albums back to user
		exports.list(req, res);
	});
};