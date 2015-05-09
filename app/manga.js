/*
* @Author: ahmadzuhdi
* @Date:   2015-05-09 18:27:08
* @Last Modified by:   ahmadzuhdi
* @Last Modified time: 2015-05-09 18:57:54
*/

'use strict';

module.exports = function() {

    var pub = {}

    var priv = {}

    var os = require('osmosis')

    pub.getAllManga = function(callback) {

        var html = os.get('http://mangaku.web.id/daftar-komik-bahasa-indonesia/')

        html
        .find('ul.series_alpha > li')
        .set({

            mangaName : 'a',
            url : 'a@href'

        })
        .data(function(result){

            console.log(result)

        })

        if(typeof callback == 'function') {

            callback()

        }

    }

    return pub

}