/* global angular */

angular.module('fooforms.organisation')
    .controller('OrganisationCtrl', ['$rootScope', '$scope', '$log', '_', 'OrganisationService', 'Organisation', 'Session',
        function ($rootScope, $scope, $log, _, OrganisationService, Organisation, Session) {
            'use strict';

            $scope.members = [];

            $scope.organisation = Session.user.organisations[0];

            OrganisationService.getMembers($scope.organisation, function (err, members) {
                $scope.members = members;
            });


            $scope.updateOrg = function (org) {

                var orgDetails = {
                    "_id": org._id,
                    "photo": org.photo,
                    "billingEmail": org.billingEmail,
                    "title": org.title,
                    "displayName": org.displayName

                };


                OrganisationService.updateOrg(orgDetails, function (err, res) {

                })
            }

        }]);
