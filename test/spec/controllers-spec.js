describe("accountsController", function() {

    var scope, controller;
    beforeEach(module('fooforms.controllers'));

    beforeEach(inject(function (
        $rootScope, $controller) {

        scope = $rootScope.$new();

        controller = $controller('AppCtrl', {
            $scope: scope
        });
    }));

    it("should have a scope variable defined", function() {
        expect(scope).toBeDefined();
    });

});