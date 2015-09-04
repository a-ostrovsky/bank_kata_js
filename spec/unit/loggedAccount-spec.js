'use strict'

var l = require('../../js/loggedAccount');
var m = require('../../js/money');
var de = require('../../js/depositEvent');
var we = require('../../js/withdrawEvent');
var gbe = require('../../js/getBalanceEvent');
var using = require('jasmine-data-provider');

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

describe('When loggedAccount is created', function () {
    var loggedAccount;
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
        loggedAccount = new l.LoggedAccount(account);
    });
    afterEach(function() {
        jasmine.clock().uninstall();            
    });
    it('should be empty', function() {
        expect(loggedAccount.events()).toEqual([]);
    });
    describe('and when performing an operation', function() {
        function operationsProvider() {
            return [
            {
                operation: 'deposit', 
                ammount: new m.Money('EUR', 10), 
                event: new de.DepositEvent(account, currentTime, new m.Money('EUR', 10))
            },
            {
                operation: 'withdraw', 
                ammount: new m.Money('EUR', 10),
                event: new we.WithdrawEvent(account, currentTime, new m.Money('EUR', 10))
            }
            ];
        }        
        using(operationsProvider, function(data) {
            beforeEach(function() {
                spyOn(account, data.operation);
                loggedAccount[data.operation](data.ammount);
            });
            it('should have been executed ('+ data.operation  +') on the underlying account', function() {
                expect(account[data.operation]).toHaveBeenCalledWith(data.ammount);
            });
            it('should have been logged', function() {
                expect(loggedAccount.events()).toContain(data.event);
            });
        });
    });
    describe('and when asked for balance', function() {
        var balanceOnAccount = new m.Money('EUR', 15);
        var returnedBalance;        
        beforeEach(function() {
            account.getBalance = function() { 
                return balanceOnAccount; 
            }
            returnedBalance = loggedAccount.getBalance();
        });
        it('should return balance on the account', function() {
            expect(returnedBalance).toEqual(balanceOnAccount);                    
        });
        it('should have been logged', function() {
            expect(loggedAccount.events())
                .toContain(new gbe.GetBalanceEvent(account, currentTime));
        }); 
    });
    describe('and when some operation fails', function() {
        var tryToWithdraw = function () {        
            try {
                loggedAccount.withdraw(new m.Money('EUR', 10));
            } catch(ignored) {
            }
        };
        var numberOfEventsBeforeOperation;
        beforeEach(function() {
            makeWithdrawlImpossible(account);
            numberOfEventsBeforeOperation = loggedAccount.events().length;
            tryToWithdraw();
        });
        it('should still loggedAccount the failed operation', function() {
            expect(loggedAccount.events().length).toBeGreaterThan(numberOfEventsBeforeOperation);
        });
    });
});
