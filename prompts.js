'use strict';
// Define all the prompts for embedded generators.
var _ = require('lodash');

function loadGruntxOptions(generator) {
    var config;
    try {
        config = generator.engine(generator.dest.read('.gruntx'));
    } catch (e) {
        console.log(e);
        generator.log.skip('unable to read .gruntx file');
        config = '{}';
    }
    config = JSON.parse(config);
    generator.gruntx = config || {};
    _.extend(generator, config);
}

function saveGruntxOption(generator, name, value) {
    var gruntx = generator.gruntx;
    gruntx[name] = value;
    require('fs').writeFileSync('.gruntx', JSON.stringify(gruntx, null, 4));
}

// @param property the property name in generator templates
// @param question the commander question to ask for
//
// @return function to call at generator runtime
function askForFactory(property, question) {
    var extra = Array.prototype.slice.call(arguments, 2);
    return function () {
        if (!this.gruntx) {
            loadGruntxOptions(this);
        }
        // load property from passed `options`.
        // This is used mostly for sub generators invocation.
        if (property in this.options && typeof this.options[property] !== 'undefined') {
            this[property] = this.options[property];
            return false;
        }

        // if provided question is a function, then it
        // is evaluated in generator context with extra arguments.
        question = typeof question === 'function' ? question.apply(this, extra) : question;
        var name = question.name;
        // initialize from gruntx option
        if (name in this.gruntx && typeof this.gruntx[name] !== 'undefined') {
            this[property] = this.gruntx[name];
            return false;
        }

        // prompt and save as a property.
        var cb = this.async();
        this.prompt([question], function (props) {
            this[property] = props[name];
            saveGruntxOption(this, name, props[name]);
            cb();
        }.bind(this));
    };
}

module.exports = {
    askFor: askForFactory,
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
        if (!preprocessor) {
            preprocessor = 'cssPreprocessor';
        }
        return {
            type: 'list',
            name: 'cssFramework',
            message: 'What framework would you like?',
            choices: function () {
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
