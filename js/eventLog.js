'use strict'

var de = require('./depositEvent.js');

exports.EventLog = function(account) {
    var events = [];

    this.events = function() {
        return events;
    }

    this.deposit = function(money) {
        //TODO: Create DepositEvent that deposits money 
        //and has a string reporesentation
        var depositEvent = new de.DepositEvent(new Date(), money);
        events.push(depositEvent);            
        account.deposit(money);
    }

}
