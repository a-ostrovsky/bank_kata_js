'use strict';

var m = require('./money.js')

exports.Account = function(currency) { 
    var balance = 0;
    this.currency = currency;

    this.getBalance = function() {
        return new m.Money("EUR", balance);
    }
    this.deposit = function(money) {
        balance += money.convertTo(this.currency).ammount;
    }
    this.withdraw = function(money) {
        if(money.ammount > balance){
            throw { 
                name: "WithdrawlOverdrawsAccount",
                message: "Withdrawl not possible. Not enough money."
            };
        }
        balance -= money.ammount;
    }
}

