let express = require('express');
let router = express.Router();

// const sqlite3 = require('sqlite3').verbose();
const db = require("../db/database.js");


const jwt = require('jsonwebtoken');

// route.use(bodyParser.json()); // for parsing application/json
// for parsing application/x-www-form-urlencoded
// route.use(bodyParser.urlencoded({ extended: true }));

let config;

//fetching config-file with secret key in
try {
    config = require('../config/config.json');
} catch (error) {
    console.error(error);
}

const secret = config.secret;

router.get("/:username", (req, res) => {
    const data = {};
    db.all("SELECT nr, name, latin, img FROM objects WHERE user = '" + req.params.username + "'",
        function(err, rows) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/login",
                        title: "Database error",
                        detail: err.message
                    }
                });
            }
            if (rows.length === 0) {
                return res.status(status);
            }
            res.json(rows);
        }
    );
});


function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, secret, function(err) {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/login",
                    title: "Database error",
                    detail: "Logga in för att skapa ny post"
                }
            });
        }
        //valid token send on the request to next function
        next();
    });
}

module.exports = router;
