{
    "alias": {
    },
    "shim": {
        "bootstrap/affix": {
            "deps": ["jquery"],
            "exports": null,
            "path": "<%%= config.www.bower %>/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/affix"
        },
        "bootstrap/transition": {
            "deps": ["bootstrap/affix"],
            "exports": null,
            "path": "<%%= config.www.bower %>/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/transition"
        },
        "bootstrap/alert": {
            "deps": ["bootstrap/transition"],
            "exports": null,
            "path": "<%%= config.www.bower %>/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/alert"
        },
        "bootstrap/button": {
            "deps": ["bootstrap/alert"],
            "exports": null,
            "path": "<%%= config.www.bower %>/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/button"
        },
        "bootstrap/collapse": {
            "deps": ["bootstrap/button"],
            "exports": null,
            "path": "<%%= config.www.bower %>/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse"
        },
        "bootstrap/dropdown": {
            "deps": ["bootstrap/collapse"],
            "exports": null,
            "path": "<%%= config.www.bower %>/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/dropdown"
        },
        "bootstrap/modal": {
            "deps": ["bootstrap/dropdown"],
            "exports": null,
            "path": "<%%= config.www.bower %>/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/modal"
        },
        "bootstrap/tooltip": {
            "deps": ["bootstrap/modal"],
            "exports": null,
            "path": "<%%= config.www.bower %>/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tooltip"
        },
        "bootstrap/popover": {
            "deps": ["bootstrap/tooltip"],
            "exports": null,
            "path": "<%%= config.www.bower %>/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/popover"
        },
        "bootstrap/scrollspy": {
            "deps": ["bootstrap/popover"],
            "exports": null,
            "path": "<%%= config.www.bower %>/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/scrollspy"
        },
        "bootstrap/tab": {
            "deps": ["bootstrap/scrollspy"],
            "exports": null,
            "path": "<%%= config.www.bower %>/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tab"
        }
    }
}
