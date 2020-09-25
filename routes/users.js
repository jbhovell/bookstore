var express = require('express');
var db = require("./database.js")

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

module.exports = router;
