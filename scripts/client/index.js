// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'client',
    shim: {
        "underscore": { exports: "_" },
        "bootstrap": {
            deps: ["jquery"],
            exports: "$"
        }
    },
    paths: {
        vendor: '../vendor',
        angular: '../vendor/angular',
        utils: '../utils',
        underscore: '../vendor/underscore-min',
        bootstrap: '../vendor/bootstrap/bootstrap.min',
        jquery: '../vendor/jquery-2.1.4.min'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['underscore', 'bootstrap', 'angular/angular.min', 'angular/angular-resource.min', 'angular/angular-route.min', 'main']);
