'use strict'

var de = require('./depositEvent');
var we = require('./withdrawEvent');
var gbe = require('./getBalanceEvent');

exports.EventLog = function(account) {
    var events = [];

    var processAndAddEventToLog = function(event) {
        events.push(event);
        return event.process();
    }

    this.events = function() {
        return events;
    }

    this.getBalance = function(money) {
        var getBalanceEvent = new gbe.GetBalanceEvent(account, new Date());
        return processAndAddEventToLog(getBalanceEvent);
    }

    this.deposit = function(money) {               
        var depositEvent = new de.DepositEvent(account, new Date(), money);
        processAndAddEventToLog(depositEvent);
    }

    this.withdraw = function(money) {
        var withdrawEvent = new we.WithdrawEvent(account, new Date(), money);
        processAndAddEventToLog(withdrawEvent);                
    }

}
