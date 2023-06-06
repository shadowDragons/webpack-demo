const path = require('path');
const webpack = require('webpack');
const dllAssetPath = path.join(__dirname, 'dll');
const dllLibraryName = 'dllExample';

module.exports = {
    // 指定可以包含在动态链接库的类库
    entry: ['lodash'],
    output: {
        path: dllAssetPath,
        filename: 'vendor.js',
        library: dllLibraryName
    },
    plugins: [
        // 生成编译后文件，然后配置到webpack.config.js文件中
        new webpack.DllPlugin({
            name: dllLibraryName,
            path: path.join(dllAssetPath, 'mainfest.json')
        })
    ]
}
