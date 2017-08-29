'use strict';
var moment = require('moment');

module.exports = {
    dataTypes : {
        'iso-date' : {
            set: function(newVal){
                var newDate;
                if (newVal === null) {
                  return {
                    val : null,
                    type : 'iso-date'
                  };
                }
                if (newVal._isAMomentObject) {
                    return {
                       val : newVal.format(),
                       type : 'iso-date'
                    };
                }
                newDate = moment(newVal);
                return {
                    val : newDate.format(),
                    type : 'iso-date'
                };

           },
           compare : function(currentVal, newVal, attributeName) {
                if (!currentVal) {
                    return !newVal ? true : false;
                }
                if (newVal._isAMomentObject) {
                    return newVal.format() === currentVal;
                }
                return newVal === currentVal;
           }
       }
    }
};
