## Available Scripts

In the project directory, you can run:
### `npm install`
To install npm and be able to run the backend

### `npm start`

#### Projekt-API
För att bygga en solid och simpel API-tjänst har Node och Express använts som bas. De två teknologierna är solida och väldokumenterade, samt har en gedigen användarbas vilket ytterligare bidrar till dess driftsäkerhet. För att enkelt kunna läsa den data som skickas ut från databasen (skapad med SQLite) skickas data som JSON, vilket gör den enkel att läsa av och sortera bland. Jag har hittills enbart positiva upplevelser av Node och Express, de fungerar väl ihop och det är enkelt att skapa och strukturera upp routes i olika filer.

För att få en väl fungerande inloggnings- och registreringsfunktion som tar hänsyn till både användarens säkerhet samt responstid har Bcrypt använts för att kryptera användarnas lösenord och JSON Web Token (JWT) använts för att kunna verifiera inloggningen på ett säkert sätt.

Databasen är, som tidigare nämnt, skapad med SQLite3 och består av två tabeller, den ena innehållandes de objekt som ska kunna tradeas och den andra bestående av användarna, deras saldo samt inloggningsuppgifter. För att på ett enkelt sätt kunna återställa databasen till sitt ursprungliga skick finns filen migrate.sql som körs igenom att starta upp sqlite3 i terminalen med hjälp av kommandot sqlite3 base.sqlite i mappen db.


#### Testning
För att skapa fungerande tester för mitt projekt-API har jag valt att använda Mocha och Chai tillsammans med Istanbul. Dessa verktyg fungerar väldigt väl tillsammans, har en smidig setup och jag uppskattade deras simplicitet sist vi använde dem, i kmom04, därav föll valet på dessa. Istanbul genererar en väldigt överskådlig och lätthanterlig vy i en html-fil, vilket underlättar när man vill se vilka delar av koden testfallen faktiskt går igenom.
Jag landade på en total kodtäckning på 86.5% vilket jag känner mig nöjd med. Jag har haft ett starkt fokus på integrationstester och framförallt sett till att testa de funktioner som kräver att man är inloggad för att de ska fungera.

En CI-kedja har implementerats i projekt-APIet och detta har gjorts med hjälp av verktyget Travis som automatiskt kör mina tester varje gång jag uppdaterar mitt github-repo med ny information
