/*global requirejs*/
requirejs.config({
    deps: ['bootstrap'],
    paths: {
        'bootstrap/affix': '<%%= vendors %>/bootstrap/js/bootstrap-affix',
        'bootstrap/transition': '<%%= vendors %>/bootstrap/js/bootstrap-transition',
        'bootstrap/alert': '<%%= vendors %>/bootstrap/js/bootstrap-alert',
        'bootstrap/button': '<%%= vendors %>/bootstrap/js/bootstrap-button',
        'bootstrap/collapse': '<%%= vendors %>/bootstrap/js/bootstrap-collapse',
        'bootstrap/dropdown': '<%%= vendors %>/bootstrap/js/bootstrap-dropdown',
        'bootstrap/modal': '<%%= vendors %>/bootstrap/js/bootstrap-modal',
        'bootstrap/tooltip': '<%%= vendors %>/bootstrap/js/bootstrap-tooltip',
        'bootstrap/popover': '<%%= vendors %>/bootstrap/js/bootstrap-popover',
        'bootstrap/scrollspy': '<%%= vendors %>/bootstrap/js/bootstrap-scrollspy',
        'bootstrap/tab': '<%%= vendors %>/bootstrap/js/bootstrap-tab',
        'bootstrap/typeahead': '<%%= vendors %>/bootstrap/js/bootstrap-typeahead'
    },
    shim: {
        'bootstrap/affix': ['jquery'],
        'bootstrap/transition': ['bootstrap/affix'],
        'bootstrap/alert': ['bootstrap/transition'],
        'bootstrap/button': ['bootstrap/alert'],
        'bootstrap/collapse': ['bootstrap/button'],
        'bootstrap/dropdown': ['bootstrap/collapse'],
        'bootstrap/modal': ['bootstrap/dropdown'],
        'bootstrap/tooltip': ['bootstrap/modal'],
        'bootstrap/popover': ['bootstrap/tooltip'],
        'bootstrap/scrollspy': ['bootstrap/popover'],
        'bootstrap/tab': ['bootstrap/scrollspy'],
        'bootstrap/typeahead': ['bootstrap/tab']
    }
});
