'use strict'

exports.DepositEvent = function(account, time, money) {
    this.toLog = function () {
        return "Deposit-"+time.toISOString()+"-"+money.currency+"-"+money.ammount;
    }

    this.process = function () {
        account.deposit(money);
    }
}
