/* global $, document, requireBower */
// This is the foundation initialization.
// refer to [foundation documentation](http://foundation.zurb.com/docs/javascript.html#configuration)
// to learn more.

// include foundation
require('modernizr');
require('fastclick');
require('foundation/foundation');
//require('foundation/abide');
//require('foundation/accordion');
//require('foundation/alert');
//require('foundation/clearing');
//require('foundation/dropdown');
//require('foundation/equalizer');
//require('foundation/interchange');
//require('foundation/joyride');
//require('foundation/magellan');
//require('foundation/offcanvas');
//require('foundation/orbit');
//require('foundation/reveal');
//require('foundation/tab');
//require('foundation/tooltip');
//require('foundation/topbar');

$(function () {
    'use strict';
    $(document).foundation();
});
