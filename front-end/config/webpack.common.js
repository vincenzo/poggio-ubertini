/**
 * Common Webpack Configuration
 */

const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HappyPack = require('happypack');
const helpers = require('./helpers');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMonitor = require('webpack-monitor');

module.exports = function (options) {
  return {
    entry: {
      'main': helpers.root('src', 'app', 'root.module.ts'),
      'vendor': helpers.root('src', 'app', 'vendor.ts')
    },
    externals: {
      'angular': 'angular',
    },
    devtool: 'cheap-module-source-map',
    output: {
      filename: '[name].bundle.js',
      path: helpers.root('dist'),
      pathinfo: true,
      sourceMapFilename: '[name].map'
    },
    resolve: {
      alias: {
        'lodash-es': 'lodash',
      },
      extensions: ['.ts', '.tsx', '.js', '.json'],
      modules: [helpers.root('src'), 'node_modules'],
    },
    plugins: [
      new HappyPack({
        id: 'ts',
        threads: 2,
        loaders: [
          'ng-annotate-loader',
          'babel-loader',
          {
            path: 'ts-loader',
            query: { happyPackMode: true }
          }
        ]
      }),
      new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor']
      }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor',

      //   minChunks: module => module.context &&
      //     module.context.includes('node_modules'),
      // }),

      // // This plugin must come after the vendor one (because webpack
      // // includes runtime into the last chunk)
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'runtime',

      //   // minChunks: Infinity means that no app modules
      //   // will be included into this chunk
      //   minChunks: Infinity,
      //   filename: 'runtime.js',
      //   // → Now the runtime file will be called
      //   // “runtime.js”, not “runtime.79f17c27b335abc7aaf4.js”
      // }),
      new CopyWebpackPlugin([{
        from: 'src/assets',
        to: 'assets'
      }]),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        chunksSortMode: 'dependency',
        isDevServer: helpers.isWebpackDevServer()
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        moment: 'moment',
      }),
      new webpack.ProvidePlugin({
        __extends: 'typescript-extends'
      }),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /it/),
      // new BundleAnalyzerPlugin(), // TODO: attivare solo se si vuol debuggare la dimensione dei bundle generati da webpack
      // new WebpackMonitor({
      //   capture: true,
      //   launch: true,
      // }),
    ],
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: [/node_modules/],
          loader: 'happypack/loader?id=ts'
        },
        {
          test: /\.html$/,
          exclude: [/node_modules/, helpers.root('src/index.html')],
          use: [
            { loader: 'ngtemplate-loader?relativeTo=' + helpers.root('src') },
            { loader: 'html-loader' }
          ],
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { minimize: true } },
            'sass-loader'
          ],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { minimize: true } },
          ]
        },
        {
          test: /\.(ttf|otf|eot|svg|woff2?)$/,
          use: [
            'file-loader',
          ]
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: [
            'file-loader',
          ]
        },
      ],
    }
  }
}
