var chai = require('chai');
var controllerTest = require('../controller/test.js');
var userRegister = require('../controller/userRegister.js');
var requisition = require('../controller/requisition');

describe('first test', function(){
    describe('function helloWorld', function(){
        it('return string helloWorld', function(){
            var str = controllerTest.helloWorld();
            chai.expect(str).to.be.a('string');
            chai.expect(str).to.equal('helloWorld');
        });
    });
});

describe('Controller used on game start', ()=>{
    describe('handling the user register', ()=>{
        var user;
        var token;
        it('should register a new user and define a token for it', ()=>{

        });
        it('should recover a specific user from mongoDB using a userId', ()=>{

        })
        it('should recover a specific user from mongoDB using token', ()=>{

        });

        after('clear db changes', ()=>{

        });
    });
    describe('module export test', ()=>{
        var user;
        it('should register a user', ()=>{

        });
        it('should recover a user and return data', ()=>{

        });
        it('should return an error when indentify a problem with the token', ()=>{

        });

        after('clear db changes', ()=>{

        });
    });
});