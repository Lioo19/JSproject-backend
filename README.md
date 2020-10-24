[![Build Status](https://travis-ci.org/Lioo19/JSproject-backend.svg?branch=master)](https://travis-ci.org/Lioo19/JSproject-backend)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Lioo19/JSproject-backend/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Lioo19/JSproject-backend/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/Lioo19/JSproject-backend/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/Lioo19/JSproject-backend/?branch=master)

## Available Scripts

In the project directory, you can run:
### `npm install`
To install npm and be able to run the backend

### `npm start`

### Projekt-API
För att bygga en solid och simpel API-tjänst har Node och Express använts som bas. De två teknologierna är solida och väldokumenterade, samt har en gedigen användarbas vilket ytterligare bidrar till dess driftsäkerhet. För att enkelt kunna läsa den data som skickas ut från databasen (skapad med SQLite) skickas data som JSON, vilket gör den enkel att läsa av och sortera bland. Jag har hittills enbart positiva upplevelser av Node och Express, de fungerar väl ihop och det är enkelt att skapa och strukturera upp routes i olika filer.

För att få en väl fungerande inloggnings- och registreringsfunktion som tar hänsyn till både användarens säkerhet samt responstid har Bcrypt använts för att kryptera användarnas lösenord och JSON Web Token (JWT) använts för att kunna verifiera inloggningen på ett säkert sätt.

Databasen är, som tidigare nämnt, skapad med SQLite3 och består av två tabeller, den ena innehållandes de objekt som ska kunna tradeas och den andra bestående av användarna, deras saldo samt inloggningsuppgifter. För att på ett enkelt sätt kunna återställa databasen till sitt ursprungliga skick finns filen migrate.sql som körs igenom att starta upp sqlite3 i terminalen med hjälp av kommandot sqlite3 base.sqlite i mappen db.


### Testning
För att skapa fungerande tester för mitt projekt-API har jag valt att använda Mocha och Chai tillsammans med Istanbul. Dessa verktyg fungerar väldigt väl tillsammans, har en smidig setup och jag uppskattade deras simplicitet sist vi använde dem, i kmom04, därav föll valet på dessa. Jag upplever syntaxen för Mocha och Chai lätt att förstå och skriva och Istanbul genererar en väldigt överskådlig och lätthanterlig sammanställning i en html-fil, vilket underlättar när man vill se vilka delar av koden testfallen faktiskt går igenom.
Jag landade på en total kodtäckning på 86.5% vilket jag känner mig nöjd med. Jag har haft ett starkt fokus på integrationstester och framförallt sett till att testa de funktioner som kräver att man är inloggad för att de ska fungera.

CI-kedjan som implementerats i projekt-APIet har skapats med hjälp av verktyget Travis som automatiskt kör testerna varje gång mitt github-repo uppdateras med någon typ av commit. Byggkedjan i Travis fungerar bra, även om jag till och från upplever att den tar lite väl mycket tid att ladda. Integrationen med Github ger dock många pluspoäng och användarupplevelsen över lag är bra. Jag anser att denna typ av verktyg underlättar mycket då automatisering av tester nästan är A och O för att de verkligen ska bli gjorda kontinuerligt.
Scrutinizer har använts för att få koll på kodtäckning och kodkvalitet och koden för detta projekt fick betyget 8.25 (Good), vilket känns som en acceptabel nivå. Genom att verktyget konkretiserar och visar vilka issues som finns i koden blir det enkelt att göra åtgärder och förbättringar, vilket över tid leder till bättre kod och bättre förståelse. Även scrutinizer kan kopplas via github och det är verkligen ett stort plus då jag tror att många annars inte hade tagit omvägen för att använda verktyget. Kort och gott är de båda verktygen för CI-kedjan riktigt bra support-verktyg!
