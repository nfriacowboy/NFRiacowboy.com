'use strict';

// Declare app level module which depends on views, and components
angular.module('NFRiaCowboy', [
  'ngRoute',
  'NFRiaCowboy.boot',
  'NFRiaCowboy.about',
  'NFRiaCowboy.version',
  'uiGmapgoogle-maps',
  'ngSanitize'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/boot'});
}]);
