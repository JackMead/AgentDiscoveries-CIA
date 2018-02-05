var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin("styles.css");

module.exports = {
    entry: './app/index.js',
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
        }]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './app/static/index.html'
        }),
        extractSass
    ],

    output: {
        path: path.join(__dirname, 'target', 'classes', 'META-INF', 'resources', 'public'),
        filename: 'bundle.js'
    }
};
