define(['./module', 'utils/utils'], function(controllers, utils) {
    function GridController($scope, Page, Model) {
        Page.setTitle('Grid');

        Model.getCollection(function(err, data) {
            data = utils.extend({}, data);
            delete data['_unsorted'];
            $scope.itms = Model.extractContactsArray(data);
        });
    }

    return controllers.controller('GridController', ['$scope', 'Page', 'Model', GridController]);
});
