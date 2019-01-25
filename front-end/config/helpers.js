/**
 * Helpers
 */

var path = require('path');

var ROOT = path.resolve(__dirname, '..');

function isWebpackDevServer() {
  return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

exports.isWebpackDevServer = isWebpackDevServer;
exports.root = root;
