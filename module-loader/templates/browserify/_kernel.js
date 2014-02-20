'use strict';

function requireBower(lib) {
    return require('../../bower_components/' + lib);
}
function requireNpm(lib) {
    return require('../../node_modules/' + lib);
}

var $ = requireBower('jquery/dist/jquery');

console.log('I\'m ready to start.');
console.log([
    'Your application uses [browserify](http://browserify.org/).',
    'Your JavaScript frontend development is located in <%= frontFilesLocation %>',
    'For your convenience, jQuery is installed.'
].join('\n'));
