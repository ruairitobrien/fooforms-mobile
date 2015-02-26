/* global angular */

angular.module('fooforms.authentication')
    .controller('LoginCtrl', ['$scope', 'AUTH_EVENTS', 'AuthService', function ($scope, AUTH_EVENTS, AuthService) {
        'use strict';
        $scope.user = {
            username: null,
            password: null
        };

        $scope.login = function (user) {
            AuthService.clearCredentials();
            AuthService.setCredentials(user.username, user.password);
            // Note: not posting anything in the login as the credentials get passed in the header
            AuthService.login();
        };

        $scope.$on(AUTH_EVENTS.loginSuccess, function () {
            $scope.user.username = null;
            $scope.user.password = null;
        });


    }])
    .controller('LogoutCtrl', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
        'use strict';

        $scope.logout = function () {
            AuthService.clearCredentials();
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        };
    }]);
