/* global angular */

angular.module('fooforms.authentication')
    .controller('LoginCtrl', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
        'use strict';
        $scope.user = {
            username: '',
            password: ''
        };

        $scope.login = function (user) {
            AuthService.clearCredentials();
            AuthService.setCredentials(user.username, user.password);
            // Note: not posting anything in the login as the credentials get passed in the header
            AuthService.login();
        };

      /**  success() {
            $scope.message = res.message || 'An error occurred while trying to log you in.';
        }

        failed() {
            $scope.message = res.message || 'An error occurred while trying to log you in.';
        }*/

    }])
    .controller('LogoutCtrl', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
        'use strict';

        $scope.logout = function () {
            AuthService.clearCredentials();
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        };
    }]);
