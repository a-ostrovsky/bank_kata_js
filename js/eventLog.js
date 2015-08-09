'use strict'

exports.EventLog = function(account) {
    this.events = function() {
        return [];
    }

    this.deposit = function(money) {
        account.deposit(money);
    }

}
