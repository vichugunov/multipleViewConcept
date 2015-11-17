// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'scripts/client',
    paths: {
        utils: '../utils'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['welcome'], function(hello) {
    var lorem = hello();
    var parsed = lorem.split(/\s+[,\.]*\s*[,\.]*/);
    console.log(parsed, parsed.length);
});
