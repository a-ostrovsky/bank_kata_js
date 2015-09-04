'use strict'
var acc = require("../../js/account");
var l = require('../../js/loggedAccount');
var m = require('../../js/money');

describe('When logged account is created', function()  {
    var account;
    var loggedAccount;
    beforeEach(function() {
        account = new acc.Account('USD');
        loggedAccount = new l.LoggedAccount(account);
    });
    describe('and when money is deposited', function() {
        var depositedAmmount = new m.Money('USD', 15);
        beforeEach(function() {
            loggedAccount.deposit(depositedAmmount);
        });
        it('should have money on the account', function() {
            expect(account.getBalance()).toEqual(depositedAmmount);
        });
        it('should have been logged', function() {
            expect(loggedAccount.events().length).toEqual(1);
        });
    });
    describe('and when account is overdrawn', function() {
        var depositedAmmount = new m.Money('USD', 5);
        var withdrawnAmmount = new m.Money('USD', 10);
        beforeEach(function() {
            try{
                loggedAccount.deposit(depositedAmmount);
                loggedAccount.withdraw(withdrawnAmmount);
            } catch (ignored) {
            }
        });
        it('should still have money on the account', function() {
            expect(account.getBalance()).toEqual(depositedAmmount);
        });
        it('should loggedAccount the attempty to withdraw', function() {
            expect(loggedAccount.events().length).toEqual(2); //1) deposit 2) withdraw
        });
    });
});
