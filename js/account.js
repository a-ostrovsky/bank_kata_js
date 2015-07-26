'use strict';

var m = require('./money.js')

exports.Account = function() {
    var balance = 0;
    this.getBalance = function() {
        return new m.Money("EUR", balance);
    }
    this.deposit = function(money) {
        balance += money.ammount;
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

