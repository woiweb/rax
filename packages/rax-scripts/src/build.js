'use strict';
/* eslint no-console: 0 */
// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const colors = require('chalk');
const rimraf = require('rimraf');

const createWebpackCompiler = require('./utils/createWebpackCompiler');
const pathConfig = require('./config/path.config');
const webpackConfigProd = require('./config/webpack.config.prod');

function build(config) {
  const compiler = createWebpackCompiler(config);

  compiler.run(err => {
    if (err) {
      throw err;
    }

    console.log(colors.green('\nBuild successfully.'));
  });
}

rimraf(pathConfig.appBuild, err => {
  if (err) {
    throw err;
  }
  build(webpackConfigProd);
});
