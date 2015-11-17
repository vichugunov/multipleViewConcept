define(['routeHelpers'], function(routeHelpers) {
    var _exports = {
        init: init
    };

    var path = require('path'),
        dirname = path.resolve(path.dirname());

    function init(router, collection) {
        // routings
        router.all('/', function(req, res) {
            res.render('index');
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
