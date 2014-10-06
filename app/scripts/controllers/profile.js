'use strict';

/**
 * @ngdoc function
 * @name eggApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the eggApp
 */
angular.module('eggApp')
  .controller('ProfileCtrl', function ($scope, AuthenticationService) {
  	console.log(AuthenticationService.getSessionId());

  });