'use strict'

var de = require('./depositEvent.js');
var we = require('./withdrawEvent.js');

exports.EventLog = function(account) {
    var events = [];

    var processAndAddEventToLog = function(event) {
        event.process();
        events.push(event);
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
