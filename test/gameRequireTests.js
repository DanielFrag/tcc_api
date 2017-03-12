process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let User = require('../model/User');
let server = require('../server.js');

describe('Routes called on game start', ()=>{
    let manipulatedToken
    describe('for a unregistered user', ()=>{
        let generatedToken;
        it('should register a new user and define a token for it', (done)=>{
            chai.request(server)
                .put('/game/userRegister')
                .send({})
                .end((err, res)=>{
                    generatedToken = res.body.token;
                    manipulatedToken = generatedToken;
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
    describe('for a registered user', ()=>{
        let sendedToken = manipulatedToken;
        let reqDate;
        let reqType = 1;
        it('should return the date of game start', ()=>{
            chai.request(server)
                .post('/game/user/start')
                .send({token: sendedToken, type: reqType})
                .end((err, res)=>{
                    chai.expect(res.body.date).to.exist;
                    reqDate = res.body.date;
                });
        });
        
        it('should find an item in user.requisitionsByType with: the same type, and the same date returned in the response', (done)=>{
            User.findOne({
                $and: [{
                    token: sendedToken
                }, {
                    requisitionsByType: {
                        $elemMatch: {
                            $and: [{
                                type: reqType
                            }, {
                                itens: {
                                    $elemMatch: {
                                        date: reqDate
                                    }
                                }
                            }]
                        }
                    }
                }]
            }, (err, doc)=>{
                chai.expect(doc).to.exist;
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