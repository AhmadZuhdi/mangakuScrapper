/*
* @Author: ahmadzuhdi
* @Date:   2015-05-09 16:56:17
* @Last Modified by:   ahmadzuhdi
* @Last Modified time: 2015-05-09 23:49:43
*/

'use strict';

(function () {

    var app = angular.module('app');

    app.controller('app.manga.list', ['$scope', 'manga', '$stateParams', '$filter', function ($scope, serviceManga, $stateParams, $filter) {

        $scope.refresh = function () {

            $scope.mangas = false;

            serviceManga.getList(function (err, res) {

                if (err) {

                    console.log(err);

                    return false;
                }

                $scope.mangas = res;

                if (!$scope.$$phase) {

                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.$apply();
                }
            });
        };

        $scope.detail = function (data) {

            serviceManga.getDetail($stateParams.name, function (err, result) {

                if (err) {

                    console.log(err);

                    return false;
                }

                $scope.detailManga = result;
            });
        };

        $scope.read = function () {

            serviceManga.getImages('' + $stateParams.rName + '/' + $stateParams.chapter, function (err, result) {

                if (err) {

                    console.log(err);

                    return false;
                }

                $scope.imageManga = $filter('orderBy')(result, 'order');
            });
        };

        if ($stateParams.name) {

            $scope.detail();
        } else if ($stateParams.rName) {

            $scope.read();
        } else {

            $scope.refresh();
        }
    }]);
})();