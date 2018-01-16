const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

let env = process.env.NODE_ENV.trim(); // 当前环境
let version = require('../package.json')['version'];

let hash = !!process.env.hash;
const jsChunkFilename = hash ? '[name].[chunkhash:8]' : '[name]';
const cssFileName = hash ? '[name].[contenthash:8]' : '[name]';
const filename = hash ? '[name].[hash:8]' : '[name]';
const vendorsName = hash ? 'vendors.[hash:5]' : 'vendors';

let config = {
    entry: {
        index: [path.resolve(__dirname, '../', 'src/index')],
        vendors: [
            'react',
            'react-dom',
            'react-redux',
            'react-router-dom',
            'react-router-redux',
            'dva-core'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../', 'dist/'),
        filename: `${filename}.js`,
        // 配置按需加载[chunkhash:5]
        chunkFilename: `${jsChunkFilename}.js`,
        // 给自动引用的生成文件加路径
        publicPath: '/dist/'

    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            use: [{
                loader: 'babel-loader',
                // options: {
                //     presets: [
                //         ['es2015', {
                //             'modules': false  //  允许tree shaking
                //         }],
                //         'stage-0',
                //         'react'
                //     ],
                //     plugins: ['transform-runtime', 'transform-decorators-legacy']
                // }
            }],
            include: [path.resolve(__dirname, '../', 'src')],
            exclude: /(node_modules|bower_components)/
        },
        {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf|ico)\??.*$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 50000,
                    name: '/imgs/[name].[ext]'
                }
            }]
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname, '../', 'build/postcss.config.js')
                            }
                        }
                    }
                ],
                fallback: 'style-loader',
            })
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'sass-loader'],
                fallback: 'style-loader',
            })
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'less-loader'],
                fallback: 'style-loader',
            })
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.tsx', 'ts'],
        alias: {
            $redux: path.resolve(__dirname, '../', 'src/redux'),
            $apis: path.resolve(__dirname, '../', 'src/apis'),
            $http: path.resolve(__dirname, '../', 'src/http'),
            $components: path.resolve(__dirname, '../', 'src/components'),
            $routes: path.resolve(__dirname, '../', 'src/routes'),
            $styles: path.resolve(__dirname, '../', 'src/styles'),
            $helper: path.resolve(__dirname, '../', 'src/helper'),
            $utils: path.resolve(__dirname, '../', 'src/utils'),
            $actions: path.resolve(__dirname, '../', 'src/actions'),
            $views: path.resolve(__dirname, '../', 'src/views'),
        }
    },
    plugins: [
        // 进度条
        new NyanProgressPlugin(),

        // 清除dist文件夹下的文件
        new CleanWebpackPlugin(['dist'], // 匹配删除的文件
            {
                root: path.resolve(__dirname, '../'), // 根目录
                verbose: true, // 开启在控制台输出信息
                dry: false  // 启用删除文件
            }),
        // lodash优化模块
        new LodashModuleReplacementPlugin(),
        // 提取公共文件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: `${vendorsName}.js`,
        }),

        // html模板插件
        new HtmlWebpackPlugin({
            inject: true,
            // filename: path.resolve(__dirname, '../', 'views/index.html'), //最终生成的html文件, 不配置默认添加到output配置的path下
            template: path.resolve(__dirname, '../', 'templates/index.html'),
            chunks: ['vendors', 'index'], // 入口文件所依赖的js文件
        }),

        // 提取css
        new ExtractTextPlugin(`styles/${cssFileName}.css`),
        //  scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),
        // 定义全局变量
        new webpack.DefinePlugin({
            __VERSION__: JSON.stringify(version),
            __DEV__: env === 'development',
            __PROD__: env === 'production',
            __WHY_DID_YOU_UPDATE__: true  // 是否检测不必要的组件重渲染
        }),
    ],
};

module.exports = config;
