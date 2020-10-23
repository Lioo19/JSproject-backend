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

describe('buy', () => {
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

describe('PUT buy', () => {
    const putreq = {
        nr: "1",
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

    it('should get 201 for put-req when logged in', (done) => {
        chai.request(server)
            .put("/marketplace/buy/1")
            .set("x-access-token", token)
            .send(putreq)
            .end((err, res) => {
                res.should.have.status(201);

                done();
            });
    });
});
