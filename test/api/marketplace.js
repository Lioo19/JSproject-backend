/* global describe it */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);

describe('Marketplace', () => {
    describe('GET /marketplace/all', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/marketplace/all")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    res.body[0].name.should.be.a("string");
                    res.body[0].img.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('GET /marketplace', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/marketplace")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    res.body[0].name.should.be.a("string");
                    res.body[0].img.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('GET /marketplace/product/1', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/marketplace/product/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.name.should.be.a("string");
                    res.body.data.img.length.should.be.above(0);

                    done();
                });
        });
    });
});
