'use strict';
exports.Account = function(a, b) {
    var balance = 0;
    this.getBalance = function() {
        return balance;
    }
    this.deposit = function(ammount) {
        balance += ammount;
    }
    this.withdraw = function(ammount) {
        if(ammount > balance){
            throw { 
                name: "WithdrawlOverdrawsAccount",
                message: "Withdrawl not possible. Not enough money."
            };
        }
        balance -= ammount;
    }
}
