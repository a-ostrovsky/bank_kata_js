'use strict'

var l = require('../js/eventLog.js');
var m = require('../js/money.js');

describe('When log is created', function () {
    var log;
    var account;
    beforeEach(function() {        
        account = {
            deposit: function(money) {}
        }
        spyOn(account, 'deposit');
        log = new l.EventLog(account);
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
    });
});
