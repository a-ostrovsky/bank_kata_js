'use strict'

exports.GetBalanceEvent = function(account, time) {
    this.toLog = function () {
        return 'GetBalance-'+time.toISOString();
    }

    this.process = function () {
        return account.getBalance();
    }
}
