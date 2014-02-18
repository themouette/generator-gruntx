'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var GruntExtendGenerator = module.exports = function GruntExtendGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(GruntExtendGenerator, yeoman.generators.Base);

GruntExtendGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);
    console.log('This generator comes with grunt-extend-config out of the box.');

    var prompts = [];
    prompts.push({
        type: 'input',
        name: 'appname',
        message: 'How wold you like to call your app?',
        default: this.appname
    });
    prompts = prompts.concat([{
        type: 'list',
        name: 'cssPreprocessor',
        message: 'What css preprocessor would you like?',
        choices: [{
                name: 'Sass',
                value: 'sass',
                checked: true
            }, {
                name: 'Vanilla css',
                value: 'vanilla',
                checked: false
            }]
        }, {
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
        }, {
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
        }, {
            type: 'confirm',
            name: 'go',
            message: 'Ready to go ?',
            default: true
        }]);

    this.prompt(prompts, function (props) {
        if (!props.go) {
            return cb(new Error('Aborted'));
        }
        this.props = props;
        cb();
    }.bind(this));
};

GruntExtendGenerator.prototype.app = function app() {
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('_README.markdown', 'README.markdown');
};

GruntExtendGenerator.prototype.grunt = function app() {
    var cb = this.async();
    this.invoke('fossil:grunt', {options: this.props}, cb);
};

GruntExtendGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
};

GruntExtendGenerator.prototype.binFiles = function binFiles() {
    this.template('bin/bootstrap.sh', 'bin/bootstrap.sh');
    this.template('bin/build.sh', 'bin/build.sh');
};
