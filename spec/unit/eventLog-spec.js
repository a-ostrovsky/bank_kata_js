'use strict'

var l = require('../../js/eventLog');
var m = require('../../js/money');
var de = require('../../js/depositEvent');
var we = require('../../js/withdrawEvent');
var gbe = require('../../js/getBalanceEvent');

var eventEqualityByStringRepresentation = function(first, second) {
    if (typeof first != 'undefined' && typeof second != 'undefined' && 
            typeof first.toLog == 'function' && typeof second.toLog == 'function') {
        return first.toLog() === second.toLog();
    }
}

var makeWithdrawlImpossible = function(account) {
    account.withdraw = function() { 
        throw 'withdrawl is not possible'; 
    }
}

describe('When log is created', function () {
    var log;
    var account;
    var currentTime = new Date(2000,1,1);
    beforeEach(function() {
        jasmine.addCustomEqualityTester(eventEqualityByStringRepresentation);
        account = {
            deposit: function(money) {},
            withdraw: function(money) {},
            getBalance: function() {}
        }        
        jasmine.clock().install();
        jasmine.clock().mockDate(currentTime);
        log = new l.EventLog(account);
    });
    afterEach(function() {
        jasmine.clock().uninstall();            
    });
    it('should be empty', function() {
        expect(log.events()).toEqual([]);
    });
    describe('and when money is deposited', function() {
        var depositedAmmount = new m.Money('EUR', 10);        
        beforeEach(function() {            
            spyOn(account, 'deposit');
            log.deposit(depositedAmmount);
        });
        it('should have money on the account', function() {
            expect(account.deposit).toHaveBeenCalledWith(depositedAmmount);
        });
        it('should have been logged', function() {
            expect(log.events())
                .toContain(new de.DepositEvent(account, currentTime, depositedAmmount));
        });

    });
    describe('and when money is withdrawn', function() {        
        var withdrawnAmmount = new m.Money('EUR', 10);
        beforeEach(function() {            
            spyOn(account, 'withdraw');
            log.withdraw(withdrawnAmmount);
        });
        it('should have money withdrawn', function() {
            expect(account.withdraw).toHaveBeenCalledWith(withdrawnAmmount);
        });
        it('should have been logged', function() {
            expect(log.events())
                .toContain(new we.WithdrawEvent(account, currentTime, withdrawnAmmount));
        });
    });
    describe('and when asked for balance', function() {
        var balanceOnAccount = new m.Money('EUR', 15);
        var returnedBalance;        
        beforeEach(function() {
            account.getBalance = function() { 
                return balanceOnAccount; 
            }
            returnedBalance = log.getBalance();
        });
        it('should return balance on the account', function() {
            expect(returnedBalance).toEqual(balanceOnAccount);                    
        });
        it('should have been logged', function() {
            expect(log.events())
                .toContain(new gbe.GetBalanceEvent(account, currentTime));
        }); 
    });
    describe('and when some operation fails', function() {
        var tryToWithdraw = function () {        
            try {
                log.withdraw(new m.Money('EUR', 10));
            } catch(ignored) {
            }
        };
        var numberOfEventsBeforeOperation;
        beforeEach(function() {
            makeWithdrawlImpossible(account);
            numberOfEventsBeforeOperation = log.events().length;
            tryToWithdraw();
        });
        it('should still log the failed operation', function() {
            expect(log.events().length).toBeGreaterThan(numberOfEventsBeforeOperation);
        });
    });
});
