module.exports.babelRules = ({ config }) => {
  config.module
    .rule('babel')
    .test(/\.(ts|tsx)$/)
    .exclude.add(/node_modules/)
    .end()
    .use('babel-loader')
    .loader('babel-loader')
    .end();
};
