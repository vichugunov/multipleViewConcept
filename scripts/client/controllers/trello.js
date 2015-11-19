define(['./module', 'utils/utils'], function(controllers, utils) {
    function TrelloController($scope, Page, Model, ButtonModifiers) {
        Page.setTitle('Trello');
        $scope.getLabel = function(key) {
            var labels = {
                'contactId': 'id',
                'phoneNumber': 'phone',
                'name': 'name',
                'groupId': 'gid'
            };

            return labels[key];
        };

        updateData();

        ButtonModifiers.addListeners({
            model: Model,
            updateCallback: updateData.bind(this)
        });

        function updateData() {
            Model.getCollection(function(err, data) {
                data = utils.extend({}, data);
                delete data['_unsorted'];
                $scope.itms = data;
            });
        }
    }

    return controllers.controller('TrelloController', ['$scope', 'Page', 'Model', 'ButtonModifiers', TrelloController]);
});
