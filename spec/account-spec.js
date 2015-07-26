'use strict'
var acc = require("../js/account");
var m = require('../js/money.js');

describe("When account is initialized", function() {
    var account;
    beforeEach(function() {
        account = new acc.Account();
    })
    it("then it has zero balance", function() {
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
//    describe("and when money is deposited in different currencies", function() {
//        var firstAmmount ={ammount: 10, currency: m.Currency.USD};
//        var secondAmmount = {ammount: 100, currency: "EUR"};
//        beforeEach(function() {
//            account.deposit(firstAmmount);
//            account.deposit(secondAmmount);
//        });
//        if("should balance of the sum of deposits regarding currencies", function() {
//            //TODO: Implement this
//            //1 USD = 0.9 EUR
//            //1 EUR = 1.1 USD
//            expect(true).toEqual(false);
//        });
//    });
});
