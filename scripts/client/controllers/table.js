define(['./module', 'utils/utils'], function(controllers, utils) {
    function TableController($scope, Page, Model, ButtonModifiers) {
        Page.setTitle('Table');

        updateData();

        ButtonModifiers.addListeners({
            model: Model,
            updateCallback: updateData.bind(this)
        });

        function updateData() {
            Model.getCollection(function(err, data) {
                data = utils.extend({}, data);
                delete data['_unsorted'];
                $scope.itms = Model.extractContactsArray(data);
            });
        }
    }

    return controllers.controller('TableController', ['$scope', 'Page', 'Model', 'ButtonModifiers', TableController]);
});
