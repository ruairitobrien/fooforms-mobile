/* global angular */

angular.module('lodash', [])
    .factory('_', function() {
        'use strict';
        return window._;
    });