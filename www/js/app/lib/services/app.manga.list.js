/*
* @Author: ahmadzuhdi
* @Date:   2015-05-09 17:05:05
* @Last Modified by:   ahmadzuhdi
* @Last Modified time: 2015-05-09 22:53:52
*/

'use strict';

(function () {

    var app = angular.module('app');

    app.service('manga', ['$http', 'app.manga.komikid', function ($http, handlerKomikId) {

        var pub = {};

        var priv = {};

        var handler = handlerKomikId;

        pub.getSetting = function (key) {

            return key ? priv.setting[key] : priv.setting;
        };

        pub.getList = function (callback) {

            handler.getList(callback);
        };

        pub.getDetail = function (name, callback) {

            handler.getDetail(name, callback);
        };

        pub.getImages = function (url, callback) {

            handler.getImages(url, callback);
        };

        return pub;
    }]);
})();