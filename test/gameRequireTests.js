process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let jwt = require ('jsonwebtoken');
chai.use(chaiHttp);
let User = require('../model/User');
let server = require('../server.js');
let secret = require('../config/parameters.js');

describe('Routes called on game start', ()=>{
    describe('for a unregistered user', ()=>{
        let generatedToken;
        it('should deny a requisition to register without gameKey', (done)=>{
            chai.request(server)
                .put('/game/userRegister')
                .send({})
                .end((err, res)=>{
                    chai.expect(res.status).to.equal(400);
                    done();
                });
        });
        it('should register a new user and define a token for it', (done)=>{
            chai.request(server)
                .put('/game/userRegister')
                .send({gameKey: secret.gameKey})
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    }
                    generatedToken = res.body.token;
                    chai.expect(res.status).to.equal(200);
                    chai.expect(res.body.token).to.be.a('string');
                    done();
                });
        });
        it('should find a user, in db, with a specific token', (done)=>{
            User.findOne({token: generatedToken}, (err, doc)=>{
                if (err) {
                    done(err);
                }
                chai.expect(doc).to.exist;
                done();
            });
        });
    });

    describe('for a registered user', ()=>{
        let userRegistered;
        let reqDate;
        let reqType = 1;
        before((done)=>{
            User.findOne({}, (err, doc)=>{
                if (err) {
                    done(err);
                }
                userRegistered = doc;
                done();
            });
        });
        it('should return the date of game start', (done)=>{
            chai.request(server)
                .post('/game/user/start')
                .send({token: userRegistered.token, type: reqType})
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    }
                    chai.expect(res.body.date).to.exist;
                    reqDate = res.body.date;
                    done();
                });
        });
        it('should find an item in user.requisitionsByType with: the same type, and the same date returned in last it', (done)=>{
            User.findOne({
                $and: [{
                    token: userRegistered.token
                }, {
                    requisitionsByType: {
                        $elemMatch: {
                            $and: [{
                                type: reqType
                            }, {
                                date: new Date(reqDate)
                            }]
                        }
                    }
                }]
            }, (err, doc)=>{
                if (err) {
                    done(err);
                }
                chai.expect(doc).to.exist;
                done();
            });
        });
        it('should stop in middleware, denying a token signed with a wrong secret.tokenKey', (done)=>{
            let wrongToken =  jwt.sign(userRegistered._id, secret.tokenKey+'wrong', {expiresIn: '10d'});
            chai.request(server)
                .post('/game/user/start')
                .send({token: wrongToken})
                .end((err, res)=>{
                    chai.expect(res.status).equals(400);
                    done();
                });
        });
    });
    
    after('clean db changes', (done) => {
        User.remove({}, (err)=>{
            if (!err) {
                done();
            }
        });
    });
});