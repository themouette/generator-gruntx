{
    "alias": {
    },

    "shim": {
        "fastclick": {
            "deps": ["jquery"],
            "exports": "$",
            "path": "<%%= config.www.bower %>/fastclick/lib/fastclick"
        },
        "modernizr": {
            "exports": "Modernizr",
            "path": "<%%= config.www.bower %>/modernizr/modernizr"
        },
        "foundation/abide": {
            "deps": ["foundation/foundation"],
            "exports": null,
            "path": "<%%= config.www.bower %>/foundation/js/foundation/foundation.abide"
        },
        "foundation/accordion": {
            "deps": ["foundation/foundation"],
            "exports": null,
            "path": "<%%= config.www.bower %>/foundation/js/foundation/foundation.accordion"
        },
        "foundation/alert": {
            "deps": ["foundation/foundation"],
            "exports": null,
            "path": "<%%= config.www.bower %>/foundation/js/foundation/foundation.alert"
        },
        "foundation/clearing": {
            "deps": ["foundation/foundation"],
            "exports": null,
            "path": "<%%= config.www.bower %>/foundation/js/foundation/foundation.clearing"
        },
        "foundation/dropdown": {
            "deps": ["foundation/foundation"],
            "exports": null,
            "path": "<%%= config.www.bower %>/foundation/js/foundation/foundation.dropdown"
        },
        "foundation/equalizer": {
            "deps": ["foundation/foundation"],
            "exports": null,
            "path": "<%%= config.www.bower %>/foundation/js/foundation/foundation.equalizer"
        },
        "foundation/interchange": {
            "deps": ["foundation/foundation"],
            "exports": null,
            "path": "<%%= config.www.bower %>/foundation/js/foundation/foundation.interchange"
        },
        "foundation/joyride": {
            "deps": ["foundation/foundation"],
            "exports": null,
            "path": "<%%= config.www.bower %>/foundation/js/foundation/foundation.joyride"
        },
        "foundation/magellan": {
            "deps": ["foundation/foundation"],
            "exports": null,
            "path": "<%%= config.www.bower %>/foundation/js/foundation/foundation.magellan"
        },
        "foundation/offcanvas": {
            "deps": ["foundation/foundation"],
            "exports": null,
            "path": "<%%= config.www.bower %>/foundation/js/foundation/foundation.offcanvas"
        },
        "foundation/orbit": {
            "deps": ["foundation/foundation"],
            "exports": null,
            "path": "<%%= config.www.bower %>/foundation/js/foundation/foundation.orbit"
        },
        "foundation/reveal": {
            "deps": ["foundation/foundation"],
            "exports": null,
            "path": "<%%= config.www.bower %>/foundation/js/foundation/foundation.reveal"
        },
        "foundation/tab": {
            "deps": ["foundation/foundation"],
            "exports": null,
            "path": "<%%= config.www.bower %>/foundation/js/foundation/foundation.tab"
        },
        "foundation/tooltip": {
            "deps": ["foundation/foundation"],
            "exports": null,
            "path": "<%%= config.www.bower %>/foundation/js/foundation/foundation.tooltip"
        },
        "foundation/topbar": {
            "deps": ["foundation/foundation"],
            "exports": null,
            "path": "<%%= config.www.bower %>/foundation/js/foundation/foundation.topbar"
        },
        "foundation/foundation": {
            "deps": ["jquery", "modernizr", "fastclick"],
            "path": "<%%= config.www.bower %>/foundation/js/foundation/foundation",
            "exports": "jQuery"
        }
    }
}
