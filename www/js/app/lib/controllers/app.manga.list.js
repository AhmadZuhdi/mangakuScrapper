/*
* @Author: ahmadzuhdi
* @Date:   2015-05-09 16:56:17
* @Last Modified by:   ahmadzuhdi
* @Last Modified time: 2015-05-09 17:14:56
*/

'use strict';

(function () {

    var app = angular.module('app');

    app.controller('app.manga.list', ['$scope', 'manga', function ($scope, serviceMangaList) {

        serviceMangaList.getList(function (err, res) {});
    }]);
})();