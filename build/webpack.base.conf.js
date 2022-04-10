const path = require('path');
const webpack = require('webpack');
const Config = require('webpack-chain');
const config = new Config();

// plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
// rules
const { babelRules } = require('./webpack.rule.conf');

config.entry('index').add(path.resolve(__dirname, '../src', 'App.tsx')).end();

config.output
  .path(path.resolve(__dirname, '../dist'))
  .publicPath('/')
  .filename('[name].bundle.js');

config.resolve.extensions.add('.ts').add('.tsx').add('.js');

config.resolve.alias.set('@', path.resolve('../src'));

config
  .plugin('html-template')
  .use(HtmlWebpackPlugin, [
    {
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      title: 'react + webpack5',
      minify: {
        html5: true, // 根據 HTML5 規範
        collapseWhitespace: true, // 摺疊空白
        preserveLineBreaks: false,
        minifyCSS: true, // 壓縮內部 CSS
        minifyJS: true, // 壓縮內部 js
        removeComments: false, // 移除註解
      },
    },
  ])
  .end();

babelRules({ config });

module.exports.config = config;
