'use strict'

exports.EventLog = function(account) {
    this.events = function() {
        return [];
    }

    this.deposit = function(money) {
        //TODO: Create DepositEvent that deposits money 
        //and has a string reporesentation
        account.deposit(money);
    }

}
