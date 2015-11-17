define(['routeHelpers'], function(routeHelpers) {
    var _exports = {
        init: init
    };

    function init(router, collection) {
        // routings
        router.all('/', function(req, res) {
            res.send('Hello World');
        });

        // get collection
        router.route('/contacts')
            .get(routeHelpers.getCollection(collection))
            .post(routeHelpers.addContact(collection))
            .put(routeHelpers.updateContact(collection))
            .delete(routeHelpers.deleteContact(collection));

        return router;
    }

    return _exports;
});
