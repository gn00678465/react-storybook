const { config } = require('./webpack.base.conf');
const path = require('path');

// config
config.mode('development').devtool('source-map');

config.devServer
  .compress(true)
  .open(false)
  .host('0.0.0.0')
  .port(3000)
  .https(false)
  .hot(true)
  .historyApiFallback(true);

module.exports = config.toConfig();
