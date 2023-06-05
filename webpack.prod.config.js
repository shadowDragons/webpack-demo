const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const addAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack');
const Happypack = require('happypack');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                name: 'vendors',
                chunks: 'all'
            }
        },
        minimize: true
    },
    plugins: [
        new htmlWebpackPlugin(),
        new addAssetHtmlPlugin([{
            filepath: path.resolve(__dirname, './dll/vendor.js')
        }]),
        new Happypack({
            id: 'styles',
            loaders: ['style-loader', 'css-loader']
        }),
        new webpack.DllReferencePlugin({
            manifest: require(path.join(__dirname, './dll/mainfest.json'))
        })
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 8000
    },
    mode: 'production'
}
