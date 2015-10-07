'use strict'

exports.WithdrawEvent = function(account, time, money) {
    this.toLog = function () {
        return 'Withdraw-' + time.toISOString() + '-' + money;
    }

    this.process = function () {
        account.withdraw(money);
    }
}
