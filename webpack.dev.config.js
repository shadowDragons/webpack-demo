const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
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
        }
    },
    plugins: [
        new htmlWebpackPlugin(),
        // webpack 分析服务
        new BundleAnalyzerPlugin({
            analyzerPort: 9000
        })
    ],
    // 开发环境服务配置
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 8000
    },
    mode: 'development'
}
