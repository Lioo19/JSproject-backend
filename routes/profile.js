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

//maybe fix a nicer solution here?
router.get('/', function(req, res) {
    console.log("");
});

//getting all the products owned by user
router.get("/:username", (req, res) => {
    const data = {};
    db.all("SELECT * FROM objects WHERE user = '" + req.params.username + "'",
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
                return res.status();
            }
            res.json(rows);
        }
    );
});

//route for adding currency to balance
router.put("/:username/addCurrency",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => addAmount(res, req.body)
);

//route for selling back to stock, make sure nr and who is mandatory (none for sale)
router.put("/:username/sell",
    (req, res, next) => checkToken(req, res, next),
    (req, res, next) => sellObject(res, req.body, next),
    (req, res) => updateBalance(res, req.body)
);

//make sure that body.amount and body.username is mandatory!
function addAmount(res, body) {
    const username = body.username;
    const amount = body.amount;

    db.run(`UPDATE users SET balance = balance + ? WHERE username = ?`,
        amount,
        username, (err) => {
            if (err) {
                return error500(res);
            }
            return res.status(201).json({
                data: {
                    msg: "Amount updated"
                }
            });
        });
}

//use objectnumber as body to sell,
//Update balance with postive amount of selling, gotten from socket
function sellObject(res, body, next) {
    const nr = body.nr;

    db.run(`UPDATE objects SET user = 'none' WHERE nr = ?`,
        nr, (err) => {
            if (err) {
                return error500(res);
            }
            next();
        });
}

function updateBalance(res, body) {
    const who = body.who;
    const amount = body.amount;

    db.run(`UPDATE users SET balance = balance + ? WHERE username = ?`,
        amount,
        who, (err) => {
            if (err) {
                return error500(res);
            }

            return res.status(201).json({
                data: {
                    msg: "Object sold and balance updated"
                }
            });
        });
}

function error500(res) {
    return res.status(500).json({
        errors: {
            status: 500,
            source: "/profile",
            title: "Database error",
            detail: "Update failed"
        }
    });
}

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, secret, function(err) {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/profile",
                    title: "Database error",
                    detail: "checkToken failed"
                }
            });
        }
        //valid token send on the request to next function
        next();
    });
}

module.exports = router;
