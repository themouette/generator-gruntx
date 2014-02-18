'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var GruntGenerator = yeoman.generators.Base.extend({
    init: function () {
        console.log('You called the grunt subgenerator with the argument ' + this.name + '.');
        if (!this.options) {
            this.options = {};
        }
        var prompts = [];

        // Add css preprocessor option if not provided
        if (!this.options.cssPreprocessor) {
            prompts.push({
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
                });
        }
        if (!this.options.templateEngine) {
            prompts.push({
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
                });
        }
        if (!this.options.features) {
            prompts.push({
                type: 'checkbox',
                name: 'features',
                message: 'What more would you like?',
                choices: [{
                        name: 'requirejs AMD',
                        value: 'requirejs',
                        checked: true
                    }, {
                        name: 'development server',
                        value: 'server',
                        checked: true
                    }, {
                        name: '',
                        value: 'lodash',
                        checked: true
                    }]
                });
        }

        if (prompts.length) {
            // add a confirm box
            prompts.push({
                type: 'confirm',
                name: 'go',
                message: 'Ready to go ?',
                default: true
            });

            var cb = this.async();
            this.prompt(prompts, function (props) {
                if (!props.go) cb(new Error('Aborted'));
                [ 'cssPreprocessor', 'templateEngine', 'features' ]
                .forEach(function (name) {
                    this.options[name] = props[name];
                }, this);
                cb();
            }.bind(this));
        }

    },

    files: function () {
        // Copy `Gruntfile.js` and basic stuff for grunt-extend
        this.template('Gruntfile.js', 'Gruntfile.js');
        this.mkdir('grunt');
        this.mkdir('grunt/tasks');
        this.mkdir('grunt/plugins');
        this.copy('grunt/plugins/extendConfig.js', 'grunt/plugins/extendConfig.js');
        // Build configuration.
        this.copy('grunt/config.json', 'grunt/config.json');

        // Add json configuration capabilities
        this.copy('grunt/tasks/options.js', 'grunt/tasks/options.js');
        this.mkdir('grunt/options');
        // this is required for the dev task.
        this.copy('grunt/options/concurrent.json', 'grunt/options/concurrent.json');

        // add doc task to generate doc.
        this.copy('grunt/tasks/doc.js', 'grunt/tasks/doc.js');

    },

    installDeps: function () {
        var cb = this.async();
        // install dependencies
        this.npmInstall([
            'lodash',
            'grunt-cli',
            'grunt',
            'load-grunt-tasks',
            'grunt-concurrent'
        ], {saveDev: true}, cb);
    },

    moduleLoading: function () {
        if (this.options.features.requirejs) {
            moduleLoading(this, 'requirejs');
        } else {
            moduleLoading(this, 'none');
        }
    },

    templateEngine: function () {
        templateEngine(this, this.options.templateEngine);
    }
});

function moduleLoading(generator, strategy, cb) {
    strategy || (strategy = 'requirejs');
    switch (strategy) {
        case 'requirejs':
            generator.copy('grunt/tasks/app-requirejs.js', 'grunt/tasks/app.js');
            generator.bowerInstall(['requirejs', 'requirejs-text'], { save: true });
            break;
        case 'none':
            generator.log('No module loading.');
            break;
        default:
            stop('Unknown module loading strategy "' + strategy + '"', cb);
    }
    if (cb) cb();
}

function templateEngine(generator, strategy, cb) {
    strategy || (strategy = 'handlebars');
    switch (strategy) {
        case 'handlebars':
            generator.bowerInstall(['handlebars'], { save: true });
            generator.npmInstall(['grunt-contrib-handlebars'], {saveDev: true});
            generator.copy('grunt/tasks/templates-hbs.js', 'grunt/tasks/templates.js');
            break;
        case 'underscore':
            generator.bowerInstall(['lodash'], { save: true });
            break;
        case 'none':
            generator.log('No template engine.');
            break;
        default:
            stop('Unknown template engine strategy "' + strategy + '"', cb);
    }
    if (cb) cb();
}

function stop(message, cb) {
    var e = new Error(message);
    generator.emit('error', e);
    if (cb) return cb(e);
    throw e;
}

module.exports = GruntGenerator;
