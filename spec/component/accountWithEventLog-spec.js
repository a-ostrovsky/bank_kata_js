'use strict'
var acc = require("../../js/account");
var l = require('../../js/eventLog.js');
var m = require('../../js/money.js');

describe('When logged account is created', function()  {
    var account;
    var log;
    beforeEach(function() {
        account = new acc.Account('USD');
        log = new l.EventLog(account);
    });
    describe('and when money is deposited', function() {
        var depositedAmmount = new m.Money('USD', 15);
        beforeEach(function() {
            log.deposit(depositedAmmount);
        });
        it('should have money on the account', function() {
            expect(account.getBalance()).toEqual(depositedAmmount);
        });
        it('should have been logged', function() {
            expect(log.events().length).toEqual(1);
        });
    });
    describe('and when account is overdrawn', function() {
        var depositedAmmount = new m.Money('USD', 5);
        var withdrawnAmmount = new m.Money('USD', 10);
        beforeEach(function() {
            try{
                log.deposit(depositedAmmount);
                log.withdraw(withdrawnAmmount);
            } catch (ignored) {
            }
        });
        it('should still have money on the account', function() {
            expect(account.getBalance()).toEqual(depositedAmmount);
        });
        it('should log the attempty to withdraw', function() {
            expect(log.events().length).toEqual(2); //1) deposit 2) withdraw
        });
    });
});
