const fs = require('fs');
const { resolve } = require('path');
const pullAll = require('lodash/pullAll');
const uniq = require('lodash/uniq');

const dllConfig = {
  dllPlugin:{
    defaults:{
      exclude: [
        'chalk',
        'cross-env',
        'express',
        'ip',
        'minimist',
        'sanitize.css',
      ],
      include:[
        "core-js",
        'babel-polyfill',
      ],
      path: resolve('./dlls'),
    },
    entry(pkg) {
      const dependencyNames = Object.keys(pkg.dependencies);
      const exclude = dllConfig.dllPlugin.defaults.exclude;
      const include = dllConfig.dllPlugin.defaults.include;
      const includeDependencies = uniq(dependencyNames.concat(include));
      // console.log(pullAll(includeDependencies, exclude))
      return {
        // projectDeps: pullAll(include, exclude),
        projectDeps: pullAll(includeDependencies, exclude),
      };
    },
  },
}

module.exports = dllConfig;