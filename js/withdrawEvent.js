'use strict'

exports.WithdrawEvent = function(account, time, money) {
    this.toLog = function () {
        return "Withdraw-"+time.toISOString()+"-"+money.currency+"-"+money.ammount;
    }

    this.process = function () {
        account.withdraw(money);
    }
}
