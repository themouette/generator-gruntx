'use strict';

var $ = require('../../bower_components/jquery/dist/jquery.js');

console.log('I\'m ready to start.');
console.log([
    'Your application uses [browserify](http://browserify.org/).',
    'Your JavaScript frontend development is located in <%= frontFilesLocation %>',
    'For your convenience, jQuery is installed.'
].join('\n'));
