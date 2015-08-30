'use strict'
var m = require('../../js/money');

describe('When money is converted to unsupported currency', function() {    
    var money = new m.Money('EUR', 10);
    it('should throw an exception', function() {
        expect(function () {money.convertTo('unsupported currency')}).toThrow();
    });
});
