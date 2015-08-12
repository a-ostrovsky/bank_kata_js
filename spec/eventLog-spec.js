'use strict'

var l = require('../js/eventLog.js');
var m = require('../js/money.js');
var de = require('../js/depositEvent.js');

var eventEqualityByStringRepresentation = function(first, second) {
    if (first instanceof de.DepositEvent && second instanceof de.DepositEvent) {
        return first.toString() === second.toString();
    }
}

describe('When log is created', function () {
    var log;
    var account;
    var currentTime = new Date(2000,1,1);
    beforeEach(function() {
        jasmine.addCustomEqualityTester(eventEqualityByStringRepresentation);
        account = {
            deposit: function(money) {}
        }
        spyOn(account, 'deposit');
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
});
