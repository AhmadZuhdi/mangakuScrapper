/*
* @Author: ahmadzuhdi
* @Date:   2015-05-09 17:05:05
* @Last Modified by:   ahmadzuhdi
* @Last Modified time: 2015-05-09 21:54:32
*/

'use strict';

(function(){

    let app = angular.module('app')

    app.service('manga', ['$http', function($http){

        let pub = {}

        let priv = {}

        priv.setting = {

            source : 'http://mangaku.web.id/',

            all : 'http://mangaku.web.id/daftar-komik-bahasa-indonesia/'

        }

        pub.getSetting = function(key) {

            return (key) ? priv.setting[key] : priv.setting

        }

        pub.getList = function(callback) {

            $http.get(priv.setting.all)
                .success(function(data){

                    let elem = $(data)

                    let mangas = []

                    elem.find('ul.series_alpha > li > a').each(function(index, e) {

                        let _e = $(e)

                        mangas.push({

                            name : _e.html(),
                            url : S(_e.attr('href')).replaceAll(priv.setting.source, '').replaceAll('/', '').s

                        })

                    })

                    if(typeof callback == 'function') {

                        callback(null, mangas)

                    }

                }, function(err) {

                    if(typeof callback == 'function') {

                        callback(err)

                    }

                })

        }

        pub.getDetail = function(name, callback) {

            $http.get(`${priv.setting.source}${name}`)
                .success(function(data){

                    let chapters = []

                    let elem = $(data)

                    let mangaName = elem.find('h2.titles').find('a').text()

                    let detail = $(elem.find('small')[2]).html()

                    let chapList = elem.find('small')[3]

                    $(chapList).first('div').find('a').each(function(index, _e){

                        let e = $(_e)

                        chapters.push({

                            name : e.text(),
                            url : S(e.attr('href')).replaceAll(priv.setting.source, '').replaceAll('/', '').s

                        })

                    })

                    if(typeof callback == 'function') {

                        callback(null, {

                            name : mangaName,

                            detail,

                            chapters

                        })

                    }

                })
                .error(function(error){

                    if(typeof callback == 'function') {

                        callback(error)

                    }

                })

        }

        pub.getImages = function(url, callback) {

            $http.get(`${priv.setting.source}${url}`)
                .success(function(data){

                    let elem = $(data)

                    let images = []

                    elem.find('img').each(function(index, _e) {

                        let e = $(_e)

                        images.push(e.attr('src'))

                    })

                    if(typeof callback == 'function') {

                        callback(null, images)

                    }

                }, function(err) {

                    if(typeof callback == 'function') {

                        callback(err)

                    }

                })


        }

        return pub

    }])

})()