define(['./module'], function(controllers) {
    function TableController($scope, Page) {
        Page.setTitle('Table');
    }

    return controllers.controller('TableController', TableController);
});
