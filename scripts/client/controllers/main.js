define(['./module'], function(controllers) {
    function MainController($scope, Page) {
        $scope.page = Page;
        $scope.navigateTo = navigateTo;
        $scope.hello = 'Hello from angular.js';
        $scope.tabs = [
            {
                route: 'trello',
                caption: 'Trello'
            },
            {
                route: 'table',
                caption: 'Table'
            },
            {
                route: 'grid',
                caption: 'Grid'
            }
        ];

        $('.nav-tabs').on('click', 'a[data-route]', function (e) {
            var endpoint = $(e.target).attr('data-route');
            navigateTo(endpoint);
        });
    }

    function navigateTo(urlController) {
        var href =  window.location.href;
        var currentUrl = href.substr(0, href.lastIndexOf('/'));
        window.location.href = currentUrl + '/' + urlController;
    }

    return controllers.controller('MainController', MainController);
});
