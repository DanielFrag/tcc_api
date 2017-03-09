var controllerAux = require('../controller/test.js');
var chai = require('chai');

describe('first test', function(){
    describe('function helloWorld', function(){
        it('return string helloWorld', function(){
            var str = controllerAux.helloWorld();
            chai.expect(str).to.be.a('string');
            chai.expect(str).to.equal('helloWorld');
        });
    });
});