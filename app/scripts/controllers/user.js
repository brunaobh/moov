'use strict';

/**
 * @ngdoc function
 * @name eggApp.controller:AboutCtrl
 * @description
 * # UserCtrl
 * Controller of the eggApp
 */
angular.module('eggApp')
  .controller('UserCtrl', function ($scope, $http, $location, AuthenticationService, flash) {
    
  // create a blank object to hold our form information
	// $scope will allow this to pass between controller and view
	$scope.formData = {};  

	// process the form
	$scope.processForm = function() {
    //AuthenticationService.login();

    AuthenticationService.login($scope.formData).then(function(data) {
      
      if(data.status === 'success') {
        AuthenticationService.setSession(data.session);
        $location.path('/profile');  
      }
      else
      {       
        flash('danger', 'Usuário não cadastrado!');
      }
      
    });

		/*$http({
      method  : 'POST',
      url     : 'http://localhost/yii/rest/index.php/api/users/auth',
      data    : $.param($scope.formData),  // pass in data as strings
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .success(function(data) {

      $scope.userLogged = data.status;
      console.log("s: " + AuthenticationService.isLoggedIn() + ' --- ' + $scope.userLogged);
      
      if (data.status == "denied") {
        SessionService.restrict = data.status;
      	// if not successful, bind errors to error variables
        $scope.message = data.status;
      } else {
      	// if successful, bind success message to message
        $scope.message = data.status;
      }
    });*/
	};
});
