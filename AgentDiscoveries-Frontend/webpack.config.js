var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const extractSass = new ExtractTextPlugin("styles.css");
const outputPath = path.join(__dirname, 'target', 'classes', 'META-INF', 'resources', 'public');

module.exports = {
    entry: './app/src/index.js',
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                fallback: "style-loader"
            })
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './app/static/index.html'
        }),
        new FaviconsWebpackPlugin('./app/static/agent.png'),
        extractSass
    ],

    devServer: {
        contentBase: outputPath,
        port: 8081,
        proxy: {
            '/v1': {
                target: 'http://localhost:8080',
                secure: false
            }
        }
    },

    output: {
        path: outputPath,
        filename: 'bundle.js'
    }
};
