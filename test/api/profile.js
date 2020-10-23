/* global describe it before exec */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

const db = require("../../db/database.js");

const user = {
    username: "test",
    email: "test@test.test",
    password: "password"
};

let token = "";

chai.use(chaiHttp);

describe('profile', () => {
    before(() => {
        return new Promise((resolve) => {
            db.run("DELETE FROM users", (err) => {
                if (err) {
                    console.error("Could not empty test DB table orders", err.message);
                }

                exec(
                    'sqlite3 v2/db/test.sqlite',
                    (error, stdout, stderr) => {
                        if (error) {
                            console.error(error.message);
                            return;
                        }

                        if (stderr) {
                            console.error(stderr);
                            return;
                        }

                        resolve();
                    });
            });
        });
    });
});

describe('profile', () => {
    describe('GET /profile/test', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/profile/test")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    res.body[0].name.should.be.a("string");
                    res.body[0].user.length.should.be.above(0);

                    done();
                });
        });
    });

    const payload = {
        username: "test",
        amount: "20"
    };

    const payloadsell = {
        nr: "8",
        who: "test",
        amount: "20"
    };


    it('successful login', (done) => {
        chai.request(server)
            .post("/login")
            .send(user)
            .end((err, res) => {
                res.body.data.should.be.an("object");
                res.text.should.be.a("string");
                res.body.data.should.have.property("token");
                token = res.body.data.token;
                done();
            });
    });

    it('should get 201 for adding Currency when logged in', (done) => {
        chai.request(server)
            .put("/profile/test/addCurrency")
            .set("x-access-token", token)
            .send(payload)
            .end((err, res) => {
                res.should.have.status(201);

                done();
            });
    });

    it('should get 201 for selling product when logged in', (done) => {
        chai.request(server)
            .put("/profile/test/sell")
            .set("x-access-token", token)
            .send(payloadsell)
            .end((err, res) => {
                res.should.have.status(201);

                done();
            });
    });
});
