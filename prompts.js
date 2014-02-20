'use strict';
// Define all the prompts for embedded generators.

function askFor(property, question) {
    var extra = Array.prototype.slice.call(arguments, 2);
    return function () {
        if (property in this.options && typeof this.options[property] !== 'undefined') {
            this[property] = this.options[property];
            return false;
        }

        question = typeof question === 'function' ? question.apply(this, extra) : question;

        var cb = this.async();
        this.prompt([question], function (props) {
            this[property] = props[question.name];
            cb();
        }.bind(this));
    };
}

module.exports = {
    askFor: askFor,
    cssPreprocessor: {
        type: 'list',
        name: 'cssPreprocessor',
        message: 'What css preprocessor would you like?',
        choices: [{
            name: 'Sass',
            value: 'sass',
            checked: true
        }, {
            name: 'Vanilla css',
            value: 'vanilla'
        }]
    },
    cssFramework: function (preprocessor) {
        preprocessor || (preprocessor = 'cssPreprocessor');
        return {
            type: 'list',
            name: 'framework',
            message: 'What framework would you like?',
            choices: function () {
                console.log(this.preprocessor);
                switch (this[preprocessor]) {
                    case 'sass':
                        return [{
                            name: 'Zurb foundation',
                            value: 'foundation',
                            checked: true
                        }, {
                            name: 'Bourbon',
                            value: 'bourbon'
                        }, {
                            name: 'Twitter bootstrap',
                            value: 'bootstrap'
                        }, {
                            name: 'None',
                            value: 'none'
                        }];
                    default:
                        return [{
                            name: 'Zurb foundation',
                            value: 'foundation',
                            checked: true
                        }, {
                            name: 'Twitter bootstrap',
                            value: 'bootstrap'
                        }, {
                            name: 'None',
                            value: 'none'
                        }];
                }
            }.bind(this)
        };
    },
    moduleLoader: {
        type: 'list',
        name: 'moduleLoader',
        message: 'Which module loader would you like?',
        choices: [{
            name: 'AMD with requirejs',
            value: 'requirejs',
            checked: true
        }, {
            name: 'CommonJS with browserify',
            value: 'commonjs',
        }, {
            name: 'ES6',
            value: 'es6',
        }, {
            name: 'No loader',
            value: 'none',
        }]
    },
    templateEngine: {
        type: 'list',
        name: 'templateEngine',
        message: 'Which template engine would you like?',
        choices: [{
            name: 'Handlebars',
            value: 'handlebars',
            checked: true
        }, {
            name: 'No engine',
            value: 'none',
            checked: false
        }]
    },

    frontFilesLocation: {
        type: 'input',
        name: 'frontFilesLocation',
        message: 'Where should I put frontend javascript files?',
        default: 'src/www',
        filter: function (val) {
            if (!val) { return ''; }
            // remove trailing slash
            return /^(.*[^\/])\/*$/.exec(val)[1] || '';
        }
    }
};
