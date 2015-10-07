'use strict'
var m = require('../../js/money.js');

var moneyEquality = function(first, second) {
    if (first instanceof m.Money && second instanceof m.Money) {
        return first.equalsAndHasSameCurrency(second);
    }
}

beforeEach(function() {
    jasmine.addCustomEqualityTester(moneyEquality);
});
