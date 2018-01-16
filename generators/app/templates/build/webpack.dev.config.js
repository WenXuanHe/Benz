const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let baseConfig = require('./webpack.base.config');
let devEnv = require('./dev');

const analyze = process.env.analyze || 'reject'; // 当前是否启动分析

// add hot-reload related code to entry chunk
Object.keys(baseConfig.entry).forEach(function (name) {
    baseConfig.entry[name] = [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client?reload=true'].concat(baseConfig.entry[name]);
});

baseConfig.plugins = baseConfig.plugins.concat([
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
]);

// 开启source-map
baseConfig.devtool = 'source-map';

if (analyze === 'resolve') {

    baseConfig.plugins.push(
        new BundleAnalyzerPlugin({
            analyzerPort: devEnv.analyzePort
        })
    );
}

module.exports = baseConfig;
