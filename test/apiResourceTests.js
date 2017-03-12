process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let User = require('../model/User');
let server = require('../server.js');

describe('Routes called on game start', ()=>{
    describe('for a unregistered user', ()=>{
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
        it('should find a user, in db, with a specific token', (done)=>{
            User.findOne({token: generatedToken}, (err, doc)=>{
                if (err) {
                    done();
                }
                chai.expect(doc).to.exist;
                done();
            });
        });
    });
/*
    describe('module export test', () => {
        let user;
        it('should register a user', () => {

        });
        it('should recover a user and return data', () => {

        });
        it('should return an error when indentify a problem with the token', () => {

        });
    });
*/
    after('clear db changes', (done) => {
           User.remove({}, (err)=>{
                if (!err) {
                    done();
                }
           });
        });
});