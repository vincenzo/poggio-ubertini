/**
 * Production Webpack Configuration
 */

const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const ENV = (process.env.ENV = process.env.NODE_ENV = "production");

module.exports = function(options) {
  return webpackMerge(
    commonConfig({
      devtool: 'source-map',
      plugins: [
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
        }),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': ENV
          }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.UglifyJsPlugin()
      ]
    })
  );
};
