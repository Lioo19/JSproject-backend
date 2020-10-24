var express = require('express');
var router = express.Router();

let h1 = `Växra`;
let headline1 = `Steg 1`;
let box1 = `Skapa ett konto`;
let headline2 = `Steg 2`;
let box2 = `Sätt in medel att handla med på din profil`;
let headline3 = `Steg 3`;
let box3 = `Välj stickling att tradea på marknaden`;
let headline4 = `Steg 4`;
let box4 = `Köp köp köp!`;


router.get('/', function(req, res) {
    const data = {
        data: {
            msg: {
                h1: h1,
                headline1: headline1,
                box1: box1,
                headline2: headline2,
                box2: box2,
                headline3: headline3,
                box3: box3,
                headline4: headline4,
                box4: box4
            }
        }
    };

    res.json(data);
});

module.exports = router;
