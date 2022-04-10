const { config } = require('./webpack.base.conf');
const path = require('path');

// config
config.mode('production');
config.output.publicPath('./').set('clean', true);

module.exports = config.toConfig();
