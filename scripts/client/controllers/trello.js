define(['./module', 'utils/utils'], function(controllers, utils) {
    function TrelloController($scope, Page, Model) {
        Page.setTitle('Trello');
        Model.getCollection(function(err, data) {
            data = utils.extend({}, data);
            delete data['_unsorted'];
            $scope.itms = data;
        });
    }

    return controllers.controller('TrelloController', ['$scope', 'Page', 'Model', TrelloController]);
});
