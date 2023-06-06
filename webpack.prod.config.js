const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const addAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack');
const Happypack = require('happypack');
module.exports = {
    // 入口文件
    entry: './src/index.js',
    // 输出文件
    output: {
        // 这里指定chunkhash，解决浏览器缓存问题，每次编译生成新的文件名
        filename: '[name].bundle.[chunkhash].js',
        // 输出路径
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        // 指定css的loader
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    optimization: {
        // 分片，不会让生成的文件过于大
        splitChunks: {
            cacheGroups: {
                name: 'vendors',
                chunks: 'all'
            }
        },
        // 压缩
        minimize: true
    },
    plugins: [
        // html自动引入打包js
        new htmlWebpackPlugin(),
        // html自动引入dll动态链接库
        new addAssetHtmlPlugin([{
            filepath: path.resolve(__dirname, './dll/vendor.js')
        }]),
        // 多线程打包
        new Happypack({
            id: 'styles',
            loaders: ['style-loader', 'css-loader']
        }),
        // 动态链接库
        new webpack.DllReferencePlugin({
            // 配置webpack.dll.config.js生成的文件
            manifest: require(path.join(__dirname, './dll/mainfest.json'))
        })
    ],
    mode: 'production'
}
