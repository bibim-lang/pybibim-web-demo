var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var PROD = (process.env.NODE_ENV === 'production');

module.exports = {
  entry: ['./src/js/main.js'],
  output: {path: path.join(__dirname, 'dist'), filename: 'bundle.js'},
  devtool: 'cheap-module-source-map',
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /(node_modules)/
      }
    ],
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
        loader: 'imports?jQuery=jquery'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass?sourceMap')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&minetype=application/font-woff&name=./[hash].[ext]'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/png'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CopyWebpackPlugin([
        {
            from: 'node_modules/monaco-editor/min/vs',
            to: 'vs',
        }
    ])
  ],
  debug: !PROD
};
