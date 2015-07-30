'use strict'

var l = require('../js/eventLog.js');

describe('When log is created', function () {
    var log;
    beforeEach(function() {
        log = new l.EventLog();
    });
    it('should be empty', function() {
        expect(log.events()).toEqual([]);
    });
});
