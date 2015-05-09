/*
* @Author: ahmadzuhdi
* @Date:   2015-05-09 17:05:05
* @Last Modified by:   ahmadzuhdi
* @Last Modified time: 2015-05-09 17:15:16
*/

'use strict';

(function(){

    var app = angular.module('app')

    app.service('manga', ['$http', function($http){

        let pub = {}

        let priv = {}


        pub.getList = function(callback) {

            $http.get('http://mangaku.web.id/daftar-komik-bahasa-indonesia/')

        }

        return pub

    }])

})()