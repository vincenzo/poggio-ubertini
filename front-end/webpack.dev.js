var path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const { UnusedFilesWebpackPlugin } = require("unused-files-webpack-plugin");
// const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

const localConfig = require('./config/local-config');
const common = require('./webpack.common.js');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || localConfig.port;

module.exports = merge(common, {
  devtool: 'cheap-eval-source-map',
  mode: 'development',
  plugins: [
    // new BundleAnalyzerPlugin(),
    // new DuplicatePackageCheckerPlugin({verbose: true,}),
    // new UnusedFilesWebpackPlugin(),
    // new HardSourceWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    port: PORT,
    host: HOST,
    historyApiFallback: true,
    proxy: {
      '/api/*': `http://${localConfig.machineIp}:${localConfig.machinePort}`
    },
  },

  watchOptions: {
    ignored: /node_modules/
  },

});