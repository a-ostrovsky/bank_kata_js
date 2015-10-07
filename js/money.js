'use strict'

exports.Money = function (currency, ammount) {
    var money = this;

    var addOrSubtract = function(sign, other) {
        var otherInSameCurrency = other.convertTo(money.getCurrency());
        var newAmmount = money.getAmmount() + 
            sign * otherInSameCurrency.getAmmount();
        return new money.constructor(money.getCurrency(), newAmmount);
    }

    this.getAmmount = function() {
        return ammount;
    }

    this.getCurrency = function() {
        return currency;
    }

    this.isLargerThan = function(other) {
        var otherInSameCurrency = other.convertTo(money.getCurrency());
        return money.getAmmount() - otherInSameCurrency.getAmmount() > 0;
    }

    this.add = function(other) {
        return addOrSubtract(1, other);      
    }

    this.subtract = function(other) {
        return addOrSubtract(-1, other);
    }

    this.convertTo = function(currency) {
        var currencyFrom = money.getCurrency();
        if(currencyFrom === 'USD' && currency === 'EUR') {        
            return new money.constructor('EUR', money.getAmmount() * 0.9);
        } else if(currencyFrom === 'EUR' && currency === 'USD') {        
            return new money.constructor('USD', money.getAmmount() * 1.1);
        } else if(currencyFrom === currency) {
            return money;
        } else {
            throw {
                name: 'UnsupportedCurrencyConversion',
                message: 'The conversion from "' + currencyFrom
                    + '" to "'+ money.getCurrency() + '" is not supported.'
            };
        }
    }

    this.toString = function() {
        return money.getAmmount() + " " + money.getCurrency();
    }

    this.equalsAndHasSameCurrency = function(other) {
        var isSameCurrency = other.getCurrency() === money.getCurrency(); 
        var isSameAmmount = other.getAmmount() === money.getAmmount();        
        return isSameCurrency && isSameAmmount;            
    }
}
