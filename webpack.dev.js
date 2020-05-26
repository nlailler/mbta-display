const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    port: process.env.PORT || '3000',
    host: '0.0.0.0',
  },
});
