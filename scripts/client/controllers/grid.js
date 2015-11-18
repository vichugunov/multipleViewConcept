define(['./module'], function(controllers) {
    function GridController($scope, Page) {
        Page.setTitle('Grid');
    }

    return controllers.controller('GridController', GridController);
});
