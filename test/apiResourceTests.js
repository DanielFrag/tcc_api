process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let User = require('../model/User');
let Requisition = require('../model/Requisition');
let server = require('../server.js');

describe('Route called on game start for a unregistered user', ()=>{
    describe('handling the user register', ()=>{
        let generatedToken;
        it('should register a new user and define a token for it', (done)=>{
            chai.request(server)
                .put('/game/userRegister')
                .send({})
                .end((err, res) => {
                    generatedToken = res.body.token;
                    chai.expect(res.status).to.equal(200);
                    chai.expect(res.body.token).to.be.a('string');
                    done();
                });
        });
        it('should find a user in db with a specific token', (done)=>{
            User.findOne({token: generatedToken}, (err, doc)=>{
                if (err) {
                    done();
                }
                chai.expect(doc).to.exist;
                done();
            });
        });
    });

    describe('module export test', () => {
        let user;
        it('should register a user', () => {

        });
        it('should recover a user and return data', () => {

        });
        it('should return an error when indentify a problem with the token', () => {

        });
    });

    after('clear db changes', (done) => {
            User.find({}, (err, docs) => {
                if (err) {
                    done();
                }
                User.remove();
                done();
            });
        });
});