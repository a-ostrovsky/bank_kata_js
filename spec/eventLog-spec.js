'use strict'

var l = require('../js/eventLog.js');
var m = require('../js/money.js');
var de = require('../js/depositEvent.js');
var we = require('../js/withdrawEvent.js');

var eventEqualityByStringRepresentation = function(first, second) {
    if (typeof first.toLog == 'function' && typeof second.toLog == 'function') {
        return first.toLog() === second.toLog();
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
            withdraw: function(money) {}
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
        var depositedAmmount = new m.Money("EUR", 10);        
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
        var withdrawnAmmount = new m.Money("EUR", 10);
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
});
