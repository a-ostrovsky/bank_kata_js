'use strict'

exports.Money = function (currency, ammount) {
    this.currency = currency;
    this.ammount = ammount;

    var money = this;

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
