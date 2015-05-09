/*
* @Author: ahmadzuhdi
* @Date:   2015-05-09 17:44:01
* @Last Modified by:   ahmadzuhdi
* @Last Modified time: 2015-05-09 17:44:04
*/

'use strict';

var express = require('express'),
app = express();
app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});