angular.module('fooforms', [
    'fooforms.controllers',
    'fooforms.services',
    'fooforms.directives',
    'fooforms.constants',
    'fooforms.config',
    'fooforms.authentication',
    'fooforms.dashboard',
    'fooforms.organisation',
    'ionic', 'lodash', 'restangular'])

    .run(function ($rootScope, $ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleBlackOpaque();
            }
        });
    });

