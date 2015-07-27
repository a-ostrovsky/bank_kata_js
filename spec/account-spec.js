'use strict'
var acc = require("../js/account");
var m = require('../js/money.js');

var moneyEquality = function(first, second) {
    if (first instanceof m.Money && second instanceof m.Money) {
        return first.currency === second.currency && first.ammount === second.ammount;
    }
}

describe("When account is initialized to EUR", function() {        
    var account;
    beforeEach(function() {
        jasmine.addCustomEqualityTester(moneyEquality);
        account = new acc.Account("EUR");
        expect(account.getBalance()).toEqual(new m.Money("EUR", 0));
    });
    describe("and when money is deposited", function() {
        var firstAmmount = new m.Money("EUR", 10);
        beforeEach(function() {
            account.deposit(firstAmmount);
        });
        it("should have balance equal to deposit", function() {
            expect(account.getBalance()).toEqual(firstAmmount);
        });
        describe("and when money is deposited again", function() {
            var secondAmmount = new m.Money("EUR", 20);
            beforeEach(function() {
                account.deposit(secondAmmount);
            });
            it("should have balance equal to first deposit + second deposit", function() {
                expect(account.getBalance()).toEqual(new m.Money("EUR", firstAmmount.ammount + secondAmmount.ammount));
            });
        });
        describe("and when less money than balance is withdrawn", function() {
            var withdrawl = new m.Money("EUR", 5);
            beforeEach(function(){
                account.withdraw(withdrawl);
            });
            it("should have balance equal to deposit - withdrawl", function() {
                expect(account.getBalance()).toEqual(new m.Money("EUR", firstAmmount.ammount - withdrawl.ammount));
            });
        })
        describe("and when withdrawl would lead to overdrawn account", function() {
           var withdrawl = new m.Money("EUR", 15);
           it("should throw an exception", function() {
                expect(function() { account.withdraw(withdrawl) }).toThrow();
            });
        });
    });
    describe("and when money is deposited in different currencies", function() {
        var firstAmmount = new m.Money("USD", 10);
        var secondAmmount = new m.Money("EUR", 100);
        beforeEach(function() {
            account.deposit(firstAmmount);
            account.deposit(secondAmmount);
        });
        it("should balance be equal to the sum of deposits in the currency of the account", function() {        
            //1 USD = 0.9 EUR            
            //=> 10*0.9 + 100 = 109
            expect(account.getBalance()).toEqual(new m.Money("EUR", 109));
        });
    });
});
describe("When account is initialized to USD", function() {    
    
})
