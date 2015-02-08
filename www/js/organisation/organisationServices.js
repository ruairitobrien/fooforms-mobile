angular.module('fooforms.organisation')
    .factory('OrganisationService',
    ['$log', 'Restangular',
        function ($log, Restangular) {
            'use strict';
            var orgApi = Restangular.all('organisations');

            return {

                createOrg: function (org, next) {
                    orgApi.post(org).then(function (res) {
                        return next(null, res);
                    }, function (err) {
                        $log.error(err);
                        return next(err);
                    });
                },
                updateOrg: function (org, next) {
                    orgApi.customPUT(org).then(function (res) {
                        return next(null, res);
                    }, function (err) {
                        $log.error(err);
                        return next(err);
                    });
                },
                deleteOrg: function (org, next) {
                    orgApi.remove().then(function () {
                        return next(null);
                    }, function (err) {
                        $log.error(err);
                        return next(err);
                    });
                },
                getMembers: function (org, next) {
                    if (typeof org.getList !== 'function') {
                        org = Restangular.restangularizeElement(orgApi, org, '');
                    }
                    org.getList('members').then(function (members) {
                        return next(null, members);
                    }, function (err) {
                        $log.error(err);
                        return next(err);
                    });
                }

            }


        }])
    .service('Organisation', function () {
        'use strict';
        this.activeOrg = {};

        this.setOrg = function (team) {
            this.activeOrg = team;
            return this.activeOrg;
        };

        return this;
    });
