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
    });
    it("should have zero balance", function() {
        expect(account.getBalance()).toEqual(new m.Money("EUR", 0));
    })
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
        it("should have balance equal to the sum of deposits in the currency of the account", function() {        
            //1 USD = 0.9 EUR            
            //=> 10*0.9 + 100 = 109
            expect(account.getBalance()).toEqual(new m.Money("EUR", 109));
        });
    });
    describe("and when money is withdrawn in different currency", function () {
        var ammountOnAccount = new m.Money("EUR", 10);
        var withdrawl = new m.Money("USD", 10); //= 9 EUR
        beforeEach(function() {
            account.deposit(ammountOnAccount);
            account.withdraw(withdrawl);
        });
        it("should withdraw money in provided currency", function() {
            expect(account.getBalance()).toEqual(new m.Money("EUR", 1));
        });
    });
});
describe("When account is initialized to USD", function() {
    var account;
    beforeEach(function() {
        jasmine.addCustomEqualityTester(moneyEquality);
        account = new acc.Account("USD");
    });
    describe("and when money is deposited in EUR", function() {
        beforeEach(function() {
            account.deposit(new m.Money("EUR", 10));
        });
        it("should have balanace in currency of the account", function() {
            expect(account.getBalance()).toEqual(new m.Money("USD", 11));
        });
    });
})
