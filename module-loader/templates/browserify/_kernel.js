/* global require, console */
'use strict';

var $ = require('jquery');

console.log('I\'m ready to start.');
console.log([
    'Your application uses [browserify](http://browserify.org/).',
    'Your JavaScript frontend development is located in <%= frontFilesLocation %>',
    'For your convenience, jQuery is installed.'
].join('\n'));
