'use strict'

exports.Money = function (currency, ammount) {
    this.currency = currency;
    this.ammount = ammount;

    var money = this;

    var addOrSubtract = function(sign, other) {
        var otherInSameCurrency = other.convertTo(money.currency);
        var newAmmount = money.ammount + sign * otherInSameCurrency.ammount;
        return new money.constructor(money.currency, newAmmount);
    }

    this.isLargerThan = function(other) {
        var otherInSameCurrency = other.convertTo(money.currency);
        return money.ammount - otherInSameCurrency.ammount > 0;
    }

    this.add = function(other) {
        return addOrSubtract(1, other);      
    }

    this.subtract = function(other) {
        return addOrSubtract(-1, other);
    }

    this.convertTo = function(currency) {
        var currencyFrom = money.currency;
        if(currencyFrom === 'USD' && currency === 'EUR') {        
            return new money.constructor('EUR', money.ammount * 0.9);
        } else if(currencyFrom === 'EUR' && currency === 'USD') {        
            return new money.constructor('USD', money.ammount * 1.1);
        } else if(currencyFrom === currency) {
            return money;
        } else {
            throw {
                name: 'UnsupportedCurrencyConversion',
                message: 'The conversion from "' + currencyFrom
                    + '" to "'+ currency + '" is not supported.'
            };
        }
    }
}
