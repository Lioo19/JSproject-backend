DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS objects;

CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    username VARCHAR(100) NOT NULL,
    balance REAL DEFAULT(0),
    UNIQUE(email, username)
);

CREATE TABLE IF NOT EXISTS objects (
    nr INT NOT NULL,
    name VARCHAR (255) NOT NULL,
    latin VARCHAR (255) NOT NULL,
    img VARCHAR (255) NOT NULL,
    user VARCHAR (255) NOT NULL,
    boughtfor REAL,
    UNIQUE(nr)
);

INSERT INTO objects (nr, name, latin, img, user) VALUES (1, "Aloe Vera", "Aloe Vera", "aloe-vera.jpg", "none");
INSERT INTO objects (nr, name, latin, img, user) VALUES (2, "Peacock Plant", "Calathea makoyana", "calathea.jpg", "none");
INSERT INTO objects (nr, name, latin, img, user) VALUES (3, "Coleus", "Coleus scutellarioides", "coleus.jpg", "none");
INSERT INTO objects (nr, name, latin, img, user) VALUES (4, "Monstera", "Monstera Deliciosa", "monstera.jpg", "none");
INSERT INTO objects (nr, name, latin, img, user) VALUES (5, "Pancake Plant", "Pilea Peperomioides", "pancake-plant.jpg", "none");
INSERT INTO objects (nr, name, latin, img, user) VALUES (6, "Snake Plant", "Dracaena trifasciata", "snakeplant.jpg", "none");
INSERT INTO objects (nr, name, latin, img, user) VALUES (7, "Zanzibar Gem", "Zamioculcas", "zanzibar-gem.jpg", "none");
INSERT INTO objects (nr, name, latin, img, user) VALUES (8, "Fire Croton", "Codiaeum variegatum", "croton-plant.jpg", "test");
