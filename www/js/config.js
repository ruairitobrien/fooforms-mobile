angular.module('fooforms.config', ['ionic', 'restangular'])
    .config(function ($compileProvider) {
        'use strict';
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })
    .config(function ($httpProvider) {
        'use strict';
        $httpProvider.defaults.timeout = 10000;
    })
    .config(function (RestangularProvider, SERVER) {
        RestangularProvider.setBaseUrl(SERVER.rootUrl + '/api');

        RestangularProvider.setDefaultHeaders({'Content-Type': 'application/json'});
        RestangularProvider.setRestangularFields({
            id: "_id",
            selfLink: 'self.link'
        });
        RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
            var extractedData;
            if (operation === "getList" && data.data) {
                // .. and handle the data and meta data
                extractedData = data.data;
                extractedData.has_more = data.has_more;
                extractedData.objectType = data.object;
            } else {
                extractedData = data;
            }
            return extractedData;
        });
    })
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })
            .state('logout', {
                url: "/logout",
                templateUrl: 'templates/logout.html',
                controller: 'LogoutCtrl'
            })

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl',
                resolve: {
                    session: function (SessionService) {
                        return SessionService.checkSession();
                    }
                }
            })
            .state('app.dashboard', {
                url: '/dashboard',
                views: {
                    'menuContent': {
                        controller: 'DashboardCtrl',
                        templateUrl: 'templates/dashboard.html'
                    }
                }
            });
        $urlRouterProvider.otherwise('/login');
    });