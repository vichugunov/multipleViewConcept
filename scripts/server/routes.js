define(['routeHelpers'], function(routeHelpers) {
    var _exports = {
        init: init
    };

    var path = require('path'),
        dirname = path.resolve(path.dirname());

    function init(router, collection) {
        // routings
        router.get('/', function(req, res) {
            res.render('landing');
        });

        router.get('/interactive', function(req, res) {
            res.render('interactive');
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
