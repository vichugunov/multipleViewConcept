define(['./module'], function(controllers) {
    function TrelloController($scope, Page) {
        Page.setTitle('Trello');
    }

    return controllers.controller('TrelloController', TrelloController);
});
