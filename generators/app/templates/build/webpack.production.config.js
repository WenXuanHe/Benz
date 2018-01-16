const webpack = require('webpack');

let baseConfig = require('./webpack.base.config');

baseConfig.plugins = baseConfig.plugins.concat([
    // 压缩配置
    new webpack.optimize.UglifyJsPlugin(
        {
            sourceMap: true
        }
    )

]);

module.exports = baseConfig;