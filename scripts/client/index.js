requirejs.config({
    baseUrl: 'client',
    paths: {
        domready: '../vendor/ready.min',
        vendor: '../vendor',
        angular: '../vendor/angular/angular.min',
        ngResource: '../vendor/angular/angular-resource.min',
        ngRoute: '../vendor/angular/angular-route.min',
        utils: '../utils',
        underscore: '../vendor/underscore-min',
        bootstrap: '../vendor/bootstrap/bootstrap.min',
        'bootstrap-editable': '../vendor/bootstrap-editable/bootstrap-editable.min',
        jquery: '../vendor/jquery-2.1.4.min',
        views: '../static/views/vm'
    },
    shim: {
        "underscore": { exports: "_" },
        "bootstrap": {
            deps: ["jquery"],
            exports: "$"
        },
        'bootstrap-editable': {
            deps: ['bootstrap']
        },
        ngResource: {
            deps: ['angular'],
            exports: 'angular'
        },
        ngRoute: {
            deps: ['angular'],
            exports: 'angular'
        },
        'angular': {
            exports: 'angular'
        },
        // deps: ['angularLoader']
    },
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app', 'underscore', 'bootstrap', 'routes'], function(app) {
    app.init();
});
