'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var prompts = require('../prompts');


var ApplicationGenerator = module.exports = function ApplicationGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ApplicationGenerator, yeoman.generators.Base);

ApplicationGenerator.prototype.init = function init() {
    // have Yeoman greet the user.
    this.log.writeln(this.yeoman);
    this.log.write();
    this.log.info('This generator comes with grunt-extend-config out of the box.');
};

ApplicationGenerator.prototype.askForFrontFilesLocation = prompts.askFor('frontFilesLocation', prompts.frontFilesLocation);
ApplicationGenerator.prototype.askForModuleLoader = prompts.askFor('moduleLoader', prompts.moduleLoader);
ApplicationGenerator.prototype.askForTemplateEngine = prompts.askFor('templateEngine', prompts.templateEngine);
ApplicationGenerator.prototype.askForPreprocessor = prompts.askFor('cssPreprocessor', prompts.cssPreprocessor);
ApplicationGenerator.prototype.askForFramework = prompts.askFor('cssFramework', prompts.cssFramework, 'cssPreprocessor');

ApplicationGenerator.prototype.askFor = function askFor() {
    var cb = this.async();
    var prompts = [{
            type: 'confirm',
            name: 'go',
            message: 'Ready to go ?',
            default: true
        }];
    var config;
    try {
        config = this.engine(this.dest.read('.gruntx'));
        this.log.write();
        this.log.info("I will proceed with following options:");
        this.log.writeln(config.replace(/^/gm, (new Array(6)).join(' ')));
        this.log.write();
    } catch (e) {
        console.log(e);
        this.log.skip('unable to read .gruntx file');
    }

    this.prompt(prompts, function (props) {
        if (!props.go) {
            return cb(new Error('Aborted'));
        }

        cb();
    }.bind(this));
};

ApplicationGenerator.prototype.app = function app() {
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('_README.markdown', 'README.markdown');
};

ApplicationGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
};

ApplicationGenerator.prototype.binFiles = function binFiles() {
    this.copy('bin/bootstrap.sh', 'bin/bootstrap.sh');
    this.copy('bin/build.sh', 'bin/build.sh');
};

ApplicationGenerator.prototype.publicFiles = function publicFiles() {
    this.template('public/_index.html', 'public/index.html');
};

ApplicationGenerator.prototype.grunt = function grunt() {

    var cb = this.async();
    this.invoke('gruntx:grunt', {
        options:  {
            skipInstall: true,
            frontFilesLocation: this.frontFilesLocation
        }
    }, cb);
};

ApplicationGenerator.prototype.moduleLoader = function moduleLoader() {
    var cb = this.async();
    this.invoke('gruntx:module-loader', {
        options: {
            skipInstall: true,
            frontFilesLocation: this.frontFilesLocation,
            moduleLoader: this.moduleLoader
        }
    }, cb);
};

// This modify moduleLoader configuration, so it MUST be executed after
// moduleLoader task.
ApplicationGenerator.prototype.stylesheets = function stylesheets() {
    var cb = this.async();
    this.invoke('gruntx:stylesheet', {
        options: {
            skipInstall: true,
            frontFilesLocation: this.frontFilesLocation,
            preprocessor: this.cssPreprocessor,
            moduleLoader: this.moduleLoader,
            framework: this.cssFramework
        }
    }, cb);
};

ApplicationGenerator.prototype.server = function server() {
    var cb = this.async();
    this.invoke('gruntx:server', {
        options: {
            skipInstall: true
        }
    }, cb);
};
