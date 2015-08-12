'use strict';

var m = require('./money.js')

exports.Account = function(currency) {
    var balance = 0;

    this.getBalance = function() {
        return new m.Money(currency, balance);
    }
    this.deposit = function(money) {
        balance += money.convertTo(currency).ammount;
    }
    this.withdraw = function(money) {
        var ammountInCurrencyOfAccount = money.convertTo(currency).ammount;
        if(ammountInCurrencyOfAccount > balance){
            throw { 
                name: "WithdrawlOverdrawsAccount",
                message: "Withdrawl not possible. Not enough money."
            };
        }
        balance -= ammountInCurrencyOfAccount;
    }
}

