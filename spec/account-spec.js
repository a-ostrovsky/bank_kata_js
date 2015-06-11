'use strict'
var acc = require("../js/account");

describe("When account is initialized", function() {
    var account;
    beforeEach(function() {
        account = new acc.Account();
    })
    it("then it has zero balance", function() {
        expect(account.getBalance()).toBe(0);
    });
    describe("and when money is deposited", function() {
        var firstAmmount = 10;
        beforeEach(function() {
            account.deposit(firstAmmount);
        });
        it("should have balance equal to deposit", function() {
            expect(account.getBalance()).toBe(firstAmmount);
        });
        describe("and when money is deposited again", function() {
            var secondAmmount = 20;
            beforeEach(function() {
                account.deposit(secondAmmount);
            });
            it("should have balance equal to first deposit + second deposit", function() {
                expect(account.getBalance()).toBe(firstAmmount + secondAmmount);
            });
        });
        describe("and when less money than balance is withdrawn", function() {
            var withdrawl = 5;
            beforeEach(function(){
                account.withdraw(withdrawl);
            });
            it("should have balance equal to deposit - withdrawl", function() {
                expect(account.getBalance()).toBe(firstAmmount - withdrawl);
            });
        })
        describe("and when withdrawl would lead to overdrawn account", function() {
           var withdrawl = 15;
           it("should throw an exception", function() {
                expect(function() { account.withdraw(withdrawl) }).toThrow();
            });
        });
    });
});
