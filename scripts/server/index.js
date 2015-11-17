var requirejs = require('requirejs');

requirejs.config({
    baseUrl: 'scripts/server',
    paths: {
      utils: '../utils'
    },
    nodeRequire: require
});

requirejs(["main"]);
