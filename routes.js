var fs = require("fs");
var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3');

var getDb = function(filename) {
    var db = new sqlite3.Database(filename);
    try {
        fs.lstatSync(filename); // throws error if doesnt exists
    } catch (e) {
        db.serialize(function() {
            db.run("CREATE TABLE users (" +
                "id INT PRIMARY KEY," +
                "username VARCHAR(255));");
            db.run('INSERT INTO users VALUES (1, "Paul"), (2, "Marc");');
        });
    }
    return db;
};


router.route('/users/:id').get(function(req, res) {
    var db = getDb('database.db');

    db.get('SELECT * FROM users where id = ?;', [req.params.id], function(err, row) {
        res.json({
            user: row
        });
    });

    db.close();
});

router.route('/users').get(function(req, res) {
    var db = getDb('database.db');

    db.all('SELECT * FROM users;', [], function(err, row) {
        res.json({
            user: row
        });
    });

    db.close();
});



module.exports = router;