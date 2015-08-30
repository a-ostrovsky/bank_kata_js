'use strict'

var de = require('./depositEvent');
var we = require('./withdrawEvent');

exports.EventLog = function(account) {
    var events = [];

    var processAndAddEventToLog = function(event) {
        events.push(event);
        event.process();
    }

    this.events = function() {
        return events;
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
