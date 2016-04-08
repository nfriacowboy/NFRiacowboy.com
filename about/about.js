/**
 * Created by NLFSoftware on 07/04/16.
 */
'use strict';

angular.module('NFRiaCowboy.about', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/about', {
            templateUrl: 'about/about.html',
            controller: 'AboutController'
        });
    }])

    .controller('AboutController', ['$scope', function($scope) {
        $scope.map = { center: { latitude: 38.797800, longitude: -9.343299 }, zoom: 12 };


        $scope.options = {scrollwheel: true};
        $scope.coordsUpdates = 0;
        $scope.dynamicMoveCtr = 0;

        $scope.marker = {
            id: 0,
            coords: {
                latitude: 38.797800,
                longitude: -9.343299
            },
            options: { draggable: false }

        };




    }]);