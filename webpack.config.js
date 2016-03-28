'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
console.log('env : '+ENV);

module.exports = {
    debug:true,
    context: __dirname + "/app",
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, 'app/app.js')
    ],
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
        publicPath:"/"
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'ng-annotate!babel'
        }, {
            test: /\.json?$/,
            loader: 'json'
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css'),
        }, {
            test: /\.html$/,
            loader: 'html'
        }]
    },
    htmlLoaer: {
        ignoreCustomFragments: [/\{\{.*?}}/]
    },
    plugins:[
        // Webpack 1.0
        new webpack.optimize.OccurenceOrderPlugin(),
        // Webpack 2.0 fixed this mispelling
        // new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("main.css"),
        new HtmlWebpackPlugin({
            template: 'app/index.tpl.html',
            inject: 'body',
            hash: true,
            filename: 'index.html'
        }),
    ]
};











/*module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, 'app/app.js')
    ],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.tpl.html',
            inject: 'body',
            hash: true,
            filename: 'index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        // Automatically move all modules defined outside of application directory to vendor bundle.
        // If you are using more complicated project structure, consider to specify common chunks manually.
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                return module.resource && module.resource.indexOf(path.resolve(__dirname, 'dist')) === -1;
            }
        }),
        new ExtractTextPlugin("dist/main.css")
    ],
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'ng-annotate!babel'
        }, {
            test: /\.json?$/,
            loader: 'json'
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
        }, {
            test: /\.html$/,
            loader: 'html'
        }]
    }
};
*/
