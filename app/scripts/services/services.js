angular.module('eggApp')
.factory('AuthenticationService', function ($rootScope, $http, $resource, $location, SessionService) {

  'use strict';

  return {

    getRoute: function () {      
    	return $http({
		    method  : 'POST',
		    url     : 'http://localhost/yii/rest/index.php/api/route/auth',
        data    : $.param({location: $location.url()}),
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
	    })
      .then(function(result){
        return result.data;
      });
    },
    routeNeedAuth: function () {
      return SessionService.restrict;
    },
    setRoute: function (route) {
      SessionService.restrict = route.restrict;
    },
    login: function (data) {
      return $http({
        method  : 'POST',
        url     : 'http://localhost/yii/rest/index.php/api/users/auth',
        data    : $.param(data),
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(function(result){
        return result.data;
      });
    },
    isLoggedIn: function () {
	    return false;
    },
    setSession: function (sessionId) {
      SessionService.sessionId = sessionId;
    },
    getSession: function () {
      return SessionService.sessionId;
    }
  };
}).factory('SessionService', function () {

  'use strict';

  return {
  	restrict: false,
    currentUser: null
  };
});