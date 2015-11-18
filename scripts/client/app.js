// from here http://habrahabr.ru/post/225931/
define(function(require) {
    var angular = require('angular');
    var ngRoute = require('ngRoute');
    var ngResource = require('ngResource');
    var services = require('./services/index');
    var controllers = require('./controllers/index');
    var directives = require('./directives/index');
    var filters = require('./filters/index');

    var app = angular.module('app', [
        'ngRoute',
        'app.services',
        'app.controllers'
        /*'app.filters',
        'app.directives'*/
    ]);

    app.init = function() {
        angular.bootstrap(document, ['app']);
    };

    return app;
});
