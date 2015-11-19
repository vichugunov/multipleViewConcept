define(['./app'], function(app) {
    return app.config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider) {
        var viewPrefix = '../../views/vm/';

        $routeProvider
            .when('/trello', {
                templateUrl: viewPrefix + 'trello.html',
                controller: 'TrelloController'
            })
            .when('/grid', {
                templateUrl: viewPrefix + 'grid.html',
                controller: 'GridController'
            })
            .when('/table', {
                templateUrl: viewPrefix + 'table.html',
                controller: 'TableController'
            })
            .otherwise({
                redirectTo: '/trello'
            });
    }]);
});
