'use strict';

var m = require('./money')

exports.Account = function(currency) {
    var balance = new m.Money(currency, 0);

    this.getBalance = function() {
        return balance;
    }

    this.deposit = function(money) {
        balance = balance.add(money);
    }

    this.withdraw = function(money) {
        if(money.isLargerThan(balance)){
            throw { 
                name: 'WithdrawlOverdrawsAccount',
                message: 'Withdrawl not possible. Not enough money.'
            };
        }
        balance = balance.subtract(money);
    }
}

