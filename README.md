[![Build Status](https://travis-ci.org/Lioo19/jsramverk-backend.svg?branch=master)](https://travis-ci.org/Lioo19/jsramverk-backend)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Lioo19/jsramverk-backend/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Lioo19/jsramverk-backend/?branch=master)

## Available Scripts

In the project directory, you can run:
### `npm install`
To install npm and be able to run the backend

### `npm start`

Runs the backend/the API for the frontend.
Open [http://localhost:1337](http://localhost:1337) to view it in the browser.


Valet av Node och express kändes givet jag personligen uppskattar dess simplicitet. För att kunna skapa ett API där datan är enkel att tolka föll valet på att skicka datan som JSON.
Inloggnings och registreringsfunktionen tar hjälp av Bcrypt för att kryptera lösenorden och Json web tokens (JWT) används för att verifiera inloggningen.
För att kunna spara och hantera användare och objekt att tradea finns två tables sparade i en sqlite-databas som även den återfinns i backenden. För att på ett enkelt sätt kunna återställa den finns filen migrate.sql som körs igenom att starta upp sqlite3 i terminalen med hjälp av kommandot sqlite3 base.sqlite i mappen db.
För att enklare kunna navigera bland de olika funktionerna ligger de uppdelade i mappen routes. Huvudfilen är som vanligt app.js i parent-mappen.
