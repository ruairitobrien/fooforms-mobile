angular.module('fooforms.directives', [])
.directive('hideOnErr', function () {
    'use strict';
    // Helper directive to hide images that 404
    return {
        link: function (scope, element) {
            element.bind('error', function () {
                element.hide();
            });
        }
    };
})