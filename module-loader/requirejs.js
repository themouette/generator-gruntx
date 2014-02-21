/* global module */
'use strict';

var tools = require('../tools');

var requirejs = module.exports = {
    // merge requirejs configuration.
    mergeConfigFile: function (generator, modulename, sourceFile) {
        var config;
        config = generator.engine(generator.src.read(sourceFile));
        requirejs.mergeConfig(generator, modulename, config);
    },
    // Append a new configuration section to the requirejs config file.
    mergeConfig: function (generator, modulename, newConfig) {
        if (!generator.frontFilesLocation) {
            throw new Error('To use requirejs.mergeConfig you need to provide `frontFilesLocation`');
        }
        var configPath = generator.frontFilesLocation + '/config.js';
        var sectionTitle = modulename + ' module configuration';

        return tools.replaceFileSection(generator, configPath, sectionTitle, newConfig);
    },

    // replace section in kernel.js or append it if not already defined.
    addKernelFile: function (generator, modulename, sourceFile) {
        if (!generator.frontFilesLocation) {
            throw new Error('To use requirejs.mergeConfig you need to provide `frontFilesLocation`');
        }
        var destFile = generator.frontFilesLocation + '/' + modulename + '.js';
        generator.copy(sourceFile, destFile);
    }
};
