const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const extractSass = new MiniCssExtractPlugin();
const outputPath = path.join(__dirname, 'target', 'classes', 'frontend');

module.exports = {
    entry: './app/src/index.jsx',

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: process.env.NODE_ENV === 'development',
                    }
                },
                "css-loader",
                "sass-loader"
            ],
        },
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
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
    },

    // 'source-map'
    // Generates a separate source map file, which can be used when debugging in production.
    //
    // 'eval-cheap-module-source-map'
    // Generates an inline source map with line numbers which is much faster to write, suitable for dev.
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-cheap-module-source-map'
};
