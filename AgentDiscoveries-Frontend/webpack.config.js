var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin("styles.css");
const outputPath = path.join(__dirname, 'target', 'classes', 'META-INF', 'resources', 'public');

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
