define(['require', 'angularLibLoader', 'app', 'routes'], function(require, ng) {
    console.log('here');
    require(['domready'], function(document) {
        ng.bootstrap(document, ['app']);
    })
});
