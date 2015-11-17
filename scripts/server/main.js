define(['utils/utils', 'model', 'routes'], function(utils, model, routes) {
    var express = require('express'),
        app = express(),
        router = express.Router(),
        port = 5000;

    var bodyParser = require('body-parser');

    var path = require('path'),
        dirname = path.resolve(path.dirname()), // due to requirejs force get directoryName
        generated = {};

    // use template engine on server-side
    app.engine('jade', require('jade').__express);

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());

    // error handling
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

    // this middleware will be executed for every request to the app
    app.use(function (req, res, next) {
        console.log('[%s] %s', (new Date()).toString(), req.originalUrl);
        next();
    });

    // use router described below
    app.use(router);

    // use static middleware
    app.use(express.static(dirname + '/static'));

    // get generated data and only after that start listening server
    model.generateData(function(err, data) {
        if (err) throw err;
        generated = utils.extend({}, data);
        routes.init(router, generated);

        app.listen(port);
        console.log('Server is listening on port', port);
    });
});
