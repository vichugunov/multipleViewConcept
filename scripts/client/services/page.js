define(['./module'], function(services) {
    function PageService($rootScope) {
        var pageTitle = 'Untitled';
        return {
            title: function() {
                return pageTitle
            },
            setTitle: function(newTitle) {
                pageTitle = newTitle
            }
        };
    }

    return services.factory('Page', PageService);
});
