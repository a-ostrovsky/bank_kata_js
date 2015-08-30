'use strict'
var m = require('../../js/money.js');

var moneyEquality = function(first, second) {
    if (first instanceof m.Money && second instanceof m.Money) {
        return first.currency === second.currency && first.ammount === second.ammount;
    }
}

beforeEach(function() {
    jasmine.addCustomEqualityTester(moneyEquality);
});
