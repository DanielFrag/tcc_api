process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let jwt = require ('jsonwebtoken');
chai.use(chaiHttp);
let User = require('../model/User.js');
let RequisitionTypeCode = require('../model/RequisitionTypeCode.js');
let server = require('../server.js');
let secret = require('../config/parameters.js');

describe('Routes called on game start', ()=>{
    before('clean users collection', (done)=>{
        User.remove({}, (err, doc)=>{
            done();
        });
    });

    describe('for a new user', ()=>{
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
        let newUser;
        let reqDate;
        let reqType = 1;
        before((done)=>{
            User.findOne({}, (err, doc)=>{
                if (err) {
                    done(err);
                }
                newUser = doc;
                done();
            });
        });
        
        it('should return the date of game start', (done)=>{
            chai.request(server)
                .post('/game/user/start')
                .send({token: newUser.token, type: reqType})
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    }
                    chai.expect(res.body.date).to.exist;
                    reqDate = res.body.date;
                    done();
                });
        });
        it('should find an item in user.requisitions with: the same type, and the same date returned in last it', (done)=>{
            User.findOne({
                $and: [{
                    token: newUser.token
                }, {
                    requisitions: {
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
            let wrongToken =  jwt.sign(newUser._id, secret.tokenKey+'wrong', {expiresIn: '10d'});
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

describe('Routes called to register analytics data', ()=>{
    let generatedToken;
    let reqType;
    before('register an user', (done)=>{
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

    it('should stop in middleware (/game/user), denying a token signed with a wrong secret.tokenKey', (done)=>{
        User.findOne({}, (err, doc)=>{
            let wrongToken =  jwt.sign({id: doc._id}, secret.tokenKey+'wrong', {expiresIn: '10d'});
            chai.request(server)
                .post('/game/user/printedAd')
                .send({token: wrongToken})
                .end((err, res)=>{
                    chai.expect(res.status).equals(400);
                    done();
                });
        });
    });
    it('should register a new requisition with a specific type', (done)=>{
        reqType = 2;
        chai.request(server)
            .post('/game/user/printedAd')
            .send({token: generatedToken, type: reqType})
            .end((err, res)=>{
                if (err) {
                    done(err);
                }
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body.date).to.not.exist;
                done();
            });
    });
    it('should find an item in user.requisitions with the same type that was send in last it', (done)=>{
        User.findOne({
            $and: [{
                token: generatedToken
            }, {
                requisitions: {
                    $elemMatch: {
                        type: reqType
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
    
    after('clean db changes', (done) => {
        User.remove({}, (err)=>{
            if (!err) {
                done();
            }
        });
    });
});

describe('Routes called to access game analytics', ()=>{
    describe('get registered users', ()=>{
        before('register an user', (done)=>{
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

        it('should stop in middleware (/admin), denying a requisition with a wrong adminPassword', (done)=>{
            chai.request(server)
                .get('/analytics/admin/get_users_data')
                .query({pass: secret.adminPassword + 'wrong'})
                .end((err, res)=>{
                    chai.expect(res.status).equals(400);
                    done();
                });
        });
        it('should stop in middleware (/admin), denying a requisition without a adminPassword', (done)=>{
            chai.request(server)
                .get('/analytics/admin/get_users_data')
                .end((err, res)=>{
                    chai.expect(res.status).equals(400);
                    done();
                });
        });
        it('should return all users', (done)=>{
            chai.request(server)
                .get('/analytics/admin/get_users_data')
                .query({pass: secret.adminPassword})
                .end((err, res)=>{
                    chai.expect(res.status).equals(200);
                    chai.expect(res.body.users).to.exist;
                    done();
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
    describe('manager type codes', ()=>{
        let reqTypeCode = {typeDescription: 'foo', code: 1};
        before('clean requisition type codes collection', (done)=>{
            RequisitionTypeCode.remove({}, (err, doc)=>{
                done();
            })
        });

        it('should deny insertion without parameters', (done)=>{
            chai.request(server)
                .put('/analytics/admin/insert_req_type')
                .send({})
                .end((err, res)=>{
                    chai.expect(res.status).equals(400);
                    done();
                });
        });
        it('should deny insertion without valid parameters', (done)=>{
            chai.request(server)
                .put('/analytics/admin/insert_req_type')
                .send({req: {typeDescription: 1, code: 'foo'}, pass: secret.pass})
                .end((err, res)=>{
                    chai.expect(res.status).equals(400);
                    done();
                });
        });
        it('should insert new requisition type code', (done)=>{
            chai.request(server)
                .put('/analytics/admin/insert_req_type')
                .send({req: reqTypeCode, pass: secret.adminPassword})
                .end((err, res)=>{
                    chai.expect(res.status).equals(200);
                    done();
                });
        });
        it('should find a requisition type code inserted', (done)=>{
            RequisitionTypeCode.findOne(reqTypeCode, (err, doc)=>{
                if (err) {
                    done(err);
                }
                chai.expect(doc).to.exist;
                done();
            });
        });
        it('will try to insert the same requisition type code', (done)=>{
            chai.request(server)
                .put('/analytics/admin/insert_req_type')
                .send({req: reqTypeCode, pass: secret.adminPassword})
                .end((err, res)=>{
                    chai.expect(res.status).equals(200);
                    done();
                });
        });
        it('should not find replications', (done)=>{
            RequisitionTypeCode.find(reqTypeCode, (err, docs)=>{
                if (err) {
                    done(err);
                }
                chai.expect(docs).to.have.length.below(2);
                done();
            });
        });
        it('should get requisition type codes', (done)=>{
            chai.request(server)
                .get('/analytics/admin/get_req_type')
                .query({pass: secret.adminPassword})
                .end((err, res)=>{
                    chai.expect(res.status).equals(200);
                    chai.expect(res.body.reqTypeCodes).to.exist;
                    done();
                });
        });

        after('clean db changes', (done) => {
            RequisitionTypeCode.remove({}, (err)=>{
                if (!err) {
                    done();
                }
            });
        });
    });
});