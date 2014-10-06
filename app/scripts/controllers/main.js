'use strict';

/**
 * @ngdoc function
 * @name eggApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eggApp
 */
angular.module('eggApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.test = {status: "ok"};


  });
