'use strict';

/**
 * @ngdoc overview
 * @name eggApp
 * @description
 * # eggApp
 *
 * Main module of the application.
 */
angular
  .module('eggApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'UserCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


angular.module('eggApp')
  .run(function ($rootScope, $location, AuthenticationService) {

    'use strict';

    $rootScope.$on('$routeChangeStart', function (event) {      
      AuthenticationService.getRoute().then(function(data) {
        if(data.route.restrict && !AuthenticationService.isLoggedIn()) {
          event.preventDefault();
          $location.path('/login');
        }
      });
    });
  });
