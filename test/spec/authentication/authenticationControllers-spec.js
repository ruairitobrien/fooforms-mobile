describe("LoginCtrl", function () {

    var scope, controller;
    beforeEach(module('fooforms'));

    beforeEach(inject(function ($rootScope, $controller) {

        scope = $rootScope.$new();

        controller = $controller('LoginCtrl', {
            $scope: scope
        });
    }));

    it("has a scope variable defined", function () {
        expect(scope).toBeDefined();
    });

});