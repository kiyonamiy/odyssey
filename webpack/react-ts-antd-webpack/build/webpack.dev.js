const webpack = require('webpack')
const path = require('path')
const webpackMerge = require('webpack-merge')
const commonWebpackConfig = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devWebpackConfig = {
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../public/index.html'),
            inject: true,
        }),
        new webpack.HotModuleReplacementPlugin(),   // 用于启用局部模块热重载，开发环境用的
    ],
    devServer: {
        host: 'localhost',
        port: 4000,
        historyApiFallback: true,
        overlay: {
            errors: true,
        },
        inline: true,
        hot: true,
    }
}

module.exports = webpackMerge(commonWebpackConfig, devWebpackConfig)