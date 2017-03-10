var chai = require('chai');
var mongoose = require('mongoose');
var request = require('request');

var jwtSecretKey = require('../config/parameters.js').secret;
require('../config/dataBase.js')(true);

var User = require('../model/User');

var controllerTest = require('../controller/test.js');
var userRegister = require('../controller/userRegister.js');
var requisition = require('../controller/requisition.js');

/*
describe('first test', function(){
    describe('function helloWorld', function(){
        it('return string helloWorld', function(){
            var str = controllerTest.helloWorld();
            chai.expect(str).to.be.a('string');
            chai.expect(str).to.equal('helloWorld');
        });
    });
});
*/

describe('Controller used on game start', ()=>{
    describe('handling the user register', ()=>{
        var user = null;
        var token = '';
        it('should register a new user and define a token for it', (done)=>{
            request.post('localhost:8080/game/userRegister', (err, res, body) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(body.token).to.be.a('string');
            });
            /*
            var aux = userRegister();
            user = userRegister();
            User.find({_id: user._id}, (err, doc) => {
                if (err) {
                    done();
                }
                chai.expect(doc).to.have.length.above(0);
            });
            */
        });
        it('should recover a specific user from mongoDB using a userId', (done) => {
            User.findOne({_id: user._id}, (err, doc) => {
                if (err) {
                    done();
                }
                chai.expect(doc.token).to.be.a('string');
            });
        });
        it('should recover a specific user from mongoDB using token', (done) => {
            User.find({token: user.token}, (err, doc) => {
                if (err) {
                    done(err);
                }
                chai.expect(doc).to.have.length.above(0);
            });
        });
        after('clear db changes', () => {
            User.find({_id: user._id}, (err, docs) => {
                if (err) {
                    done();
                }
                //docs.remove();
                mongoose.connection.close();
            });
        });
    });
    /*
    describe('module export test', () => {
        var user;
        it('should register a user', () => {

        });
        it('should recover a user and return data', () => {

        });
        it('should return an error when indentify a problem with the token', () => {

        });

        after('clear db changes', () => {

        });
    });
    */
});