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

//route for all objects that does not belong to a user
router.get('/', (req, res) => {
    const data = {};
    db.all("SELECT nr, name, latin, img FROM objects WHERE user = 'none'",
        function(err, rows) {
            if (err) {
                return console.error(error.message);
            }
            if (rows.length === 0) {
                return res.status(status);
            }
            res.json(rows);
        }
    );
});


router.get("/product/:nr", (req, res) => {
    db.each("SELECT name, latin, img, user FROM objects WHERE nr = " + req.params.nr,
        function(err, row) {
            const data = {
                data: {
                    nr: req.params.nr,
                    name: row.name,
                    latin: row.latin,
                    img: row.img,
                    user: row.user
                }
            };

            res.json(data);
        }
    );
});

//ROUTE AND FUNCTION FOR SELLING
//NEEDS TO CHECK IF THE USER OWNS IT ALREADY
// router.put("/sell/:which",
//     (req, res, next) => checkToken(req, res, next),
//     (req, res) => sell(res, req.body));
//
// function sell(res, body) {
//     const user = "none";
//     const name = body.name;

//continue this to check who owns the plant
    // db.run(`SELECT * FROM objects WHERE name = ?`,
    //     name, (err) => {
    //         if (err) {
    //             return res.status(500).json({
    //                 errors: {
    //                     status: 500,
    //                     source: "/login",
    //                     title: "Database error",
    //                     detail: "Update failed"
    //                 }
    //             });
    //         }
    //     }
//
//     db.run(`UPDATE objects SET user = ? WHERE name = ?`,
//         user,
//         name, (err) => {
//             if (err) {
//                 return res.status(500).json({
//                     errors: {
//                         status: 500,
//                         source: "/login",
//                         title: "Database error",
//                         detail: "Update failed"
//                     }
//                 });
//             }
//             return res.status(201).json({
//                 data: {
//                     msg: "Object successfully updated"
//                 }
//             });
//         });
// }

// router.post("/",
//     (req, res, next) => checkToken(req, res, next),
//     (req, res) => newpost(res, req.body));
//
// function newpost(res, body) {
//     const reportId = body.reportId;
//     const rtext = body.rtext;
//
//
//     db.run("INSERT INTO reports (reportnr, reporttext) VALUES (?, ?)",
//         reportId,
//         rtext, (err) => {
//             if (err) {
//                 return res.status(500).json({
//                     errors: {
//                         status: 500,
//                         source: "/login",
//                         title: "Database error",
//                         detail: "Rapport existerar redan"
//                     }
//                 });
//             }
//             return res.status(201).json({
//                 data: {
//                     msg: "Report successfully created!"
//                 }
//             });
//         });
// }

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
