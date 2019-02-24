/* globals angular */

'use strict';

const storageData = {

    get: function (key, callback) {
        var storage_data = localStorage.getItem(key) ? localStorage.getItem(key) : '{}';

        storage_data = JSON.parse(storage_data);
        return callback(null, storage_data);
    },
    set: function (key, val, callback) {
        localStorage.setItem(key, JSON.stringify(val));
        return callback(null);
    }

};


module.exports = storageData;