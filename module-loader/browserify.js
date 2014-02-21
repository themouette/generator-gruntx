/* global module */
'use strict';

var tools = require('../tools');

var browserify = module.exports = {
    // merge browserify configuration.
    mergeConfigFile: function (generator, modulename, sourceFile) {
        var config;
        try {
            config = generator.engine(generator.src.read(sourceFile));
        } catch (e) {
            console.log(e);
            config = '{}';
        }
        config = JSON.parse(config);
        browserify.mergeConfig(generator, modulename, config);
    },
    // merge config into browserify config file.
    // this config file is loaded in the grunt task.
    mergeConfig: function (generator, modulename, newConfig) {
        if (!generator.frontFilesLocation) {
            throw new Error('To use browserify.mergeConfig you need to provide `frontFilesLocation`');
        }
        var i;
        var destFile = generator.frontFilesLocation + '/config.js';
        var config = generator.dest.read(destFile);
        config = JSON.parse(config);

        // merge shim
        if (!config.shim) { config.shim = {}; }
        if (!newConfig.shim) { newConfig.shim = {}; }
        for (i in newConfig.shim) {
            config.shim[i] = newConfig.shim[i];
        }

        // merge alias
        if (!config.alias) { config.alias = {}; }
        if (!newConfig.alias) { newConfig.alias = {}; }
        for (i in newConfig.alias) {
            config.alias[i] = newConfig.alias[i];
        }

        generator.dest.write(destFile, JSON.stringify(config, null, 4));
    },

    // replace section in kernel.js or append it if not already defined.
    addKernelFile: function (generator, modulename, sourceFile) {
        if (!generator.frontFilesLocation) {
            throw new Error('To use browserify.mergeConfig you need to provide `frontFilesLocation`');
        }
        var configPath = generator.frontFilesLocation + '/kernel.js';
        var sectionTitle = modulename + ' module configuration';
        var newContent = generator.engine(generator.src.read(sourceFile));

        return tools.replaceFileSection(generator, configPath, sectionTitle, newContent);
    }
};
