/* global $, document, requireBower */
// This is the foundation initialization.
// refer to [foundation documentation](http://foundation.zurb.com/docs/javascript.html#configuration)
// to learn more.

// include foundation
requireBower('modernizer/modernizer');
requireBower('fastclick/lib/fastclick');
function requireFoundation(part) {
    'use strict';
    return requireBower('foundation/js/foundation/foundation.' + part);
}
requireFoundation('foundation');
//require('abide');
//require('accordion');
//require('alert');
//require('clearing');
//require('dropdown');
//require('equalizer');
//require('interchange');
//require('joyride');
//require('magellan');
//require('offcanvas');
//require('orbit');
//require('reveal');
//require('tab');
//require('tooltip');
//require('topbar');

$(function () {
    'use strict';
    $(document).foundation();
});
