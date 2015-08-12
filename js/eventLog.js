'use strict'

var de = require('./depositEvent.js');

exports.EventLog = function(account) {
    var events = [];

    this.events = function() {
        return events;
    }

    this.deposit = function(money) {               
        var depositEvent = new de.DepositEvent(account, new Date(), money);
        depositEvent.process();
        events.push(depositEvent);        
    }

}
