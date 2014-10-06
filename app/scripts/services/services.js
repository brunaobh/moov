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
	    return SessionService.user_id !== null;
    },
    setSession: function (session) {      
      SessionService.user_id = session.user_id;
      SessionService.user_name = session.user_name;
      SessionService.session_id = session.session_id;
    },
    getSessionId: function () {
      return SessionService.session_id;
    },
    getUserId: function () {
      return SessionService.user_id;
    },
    getUserName: function () {
      return SessionService.user_name;
    }
  };
}).factory('SessionService', function () {

  'use strict';

  return {
  	restrict: false,
    session_id: null,  
    user_id: null,
    user_name: null
  };
}).factory('flash', ['$rootScope', '$timeout', function($rootScope, $timeout) {
  var messages = [];

  var reset;
  var cleanup = function() {
    $timeout.cancel(reset);
    reset = $timeout(function() { messages = []; });
  };

  var emit = function() {
    $rootScope.$emit('flash:message', messages, cleanup);
  };

  $rootScope.$on('$locationChangeSuccess', emit);

  var asMessage = function(level, text) {
    if (!text) {
      text = level;
      level = 'success';
    }
    return { level: level, text: text };
  };

  var asArrayOfMessages = function(level, text) {
    if (level instanceof Array) return level.map(function(message) {
      return message.text ? message : asMessage(message);
    });
    return text ? [{ level: level, text: text }] : [asMessage(level)];
  };

  var flash = function(level, text) {
    emit(messages = asArrayOfMessages(level, text));
  };

  ['danger', 'warning', 'info', 'success'].forEach(function (level) {
    flash[level] = function (text) { flash(level, text); };
  });

  return flash;
}])

.directive('flashMessages', [function() {
  var directive = { restrict: 'EA', replace: true };
  directive.template =
    '<ul id="flash-messages" class="list-group">' +
      '<li ng-repeat="m in messages" class="list-group-item list-group-item-{{m.level}}">{{m.text}}</li>' +
    '</ul>';

  directive.controller = ['$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.$on('flash:message', function(_, messages, done) {
      $scope.messages = messages;
      done();
    });
  }];

  return directive;
}]);