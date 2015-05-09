/*
* @Author: ahmadzuhdi
* @Date:   2015-05-09 22:45:12
* @Last Modified by:   ahmadzuhdi
* @Last Modified time: 2015-05-09 23:27:26
*/

'use strict';

(function () {

    let app = angular.module('app')

    app.service('app.manga.komikid', ['$http', '$rootScope', function($http, $rootScope){

        let pub = {}

        let priv = {}

        priv.setting = {

            source : 'http://www.komikid.com/',

            all : 'http://www.komikid.com/daftar.php',

        }

        pub.getList = function(callback){

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

                    let maxPage = 0

                    elem.find('select').each(function(index, _e) {

                        let e = $(_e)

                        if(e.attr('name').toLowerCase() == 'chapter') {

                            e.find('option').each(function (index, _e) {

                                let chapName = $(_e).text()

                                chapters.push({

                                    name : chapName,
                                    manga : name,
                                    url : `${chapName}`

                                })

                            })

                        }

                        if(e.attr('name').toLowerCase() == 'page') {

                            e.find('option').each(function (index, _e) {

                                maxPage++

                            })

                        }


                    })

                    if(typeof callback == 'function') {

                        callback(null, {

                            name : mangaName,

                            detail,

                            maxPage,

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

            let maxImage = 0

            let images = []

            $http.get(`${priv.setting.source}${url}/01`)
                .success(function(data, status){

                    let elem = $(data)

                    elem.find('select').each(function(index, _e) {

                        let e = $(_e)

                        if(e.attr('name').toLowerCase() == 'page') {

                            e.find('option').each(function (index, _e) {

                                maxImage++

                            })

                        }

                        let max = 1

                        let sleep = 15

                        let iSleep = 0

                        let i = 1

                        let loop = true

                        while(loop) {

                            $http.get(`${priv.setting.source}${url}/${(i < 10) ? '0' + i : i}`)
                                .success(function (data, status) {

                                    let elem = $(data)

                                    elem.find('img.picture').each(function(index, _e) {

                                        let e = $(_e)

                                        images.push({

                                            url : e.attr('src')

                                        })

                                        if(_.size(images) >= maxImage) {

                                            if(typeof callback == 'function') {

                                                callback(null, images)

                                            }

                                        }

                                    })

                                })


                            i++

                            if(i > maxImage) loop = false

                        }

                    })



                })
                .error(function(err) {


                })

        }

        return pub

    }])

})()