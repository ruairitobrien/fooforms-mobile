angular.module('fooforms.services', [])
.factory("SessionService", ['$location', '$q', '$log', '_', 'AuthService', 'DashboardService', 'OrganisationService', 'Session',
    function ($location, $q, $log, _, AuthService, DashboardService, OrganisationService, Session) {
        return {
            checkSession: function () {
                var deferred = $q.defer();
                if (!AuthService.isAuthenticated()) {
                    AuthService.checkStoredCredentials(function (err) {
                        if (err) {
                            $log.log(err);
                        }
                        if (!AuthService.isAuthenticated()) {
                            if ($location.path() !== '/login') {
                                $location.path("/login");
                            }
                        } else {
                            DashboardService.getUserDashboard(function (err, result) {
                                if (err) {
                                    $log.error(err);
                                } else {
                                    if (!result.photo) {
                                        result.photo = '/assets/images/photo.jpg';
                                    }
                                    result.self = {};
                                    result.self.link = '/api/users/' + result._id;
                                    Session.user = result;

                                    _.forEach(Session.user.organisations, function (organisation) {
                                        organisation.teams = _.filter(Session.user.teams, {organisation: organisation._id});
                                    });


                                    Session.org = angular.copy(Session.user.organisations[0]);
                                    OrganisationService.getMembers(Session.user.organisations[0], function (err, members) {
                                        Session.org.members = members;
                                        for (var i = 0; i < Session.org.members.length; i++) {
                                            // This is to allow Restangular do put & remove on these objects.
                                            Session.org.members[i].self = {};
                                            Session.org.members [i].self.link = '/api/users/' + Session.org.members[i]._id;
                                        }
                                    });


                                    deferred.resolve(Session.user);
                                }
                            });
                        }
                    });
                } else {
                    deferred.resolve(Session.user);
                }
                return deferred.promise;
            }
        }
    }])