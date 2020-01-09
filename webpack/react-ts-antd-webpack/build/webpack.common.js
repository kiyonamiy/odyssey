// const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')     // 将 css 从 js 里分离出来
const antdTheme = require('./antd-theme')
const webpackSettings = require('./webpack-settings')

// const oriEnv = require('./env.json')[envConfig.APP_ENV]     // 三挑一
// Object.assign(oriEnv, {
//     APP_ENV: envConfig.APP_ENV
// })

// const defineEnv = {}        // { APP_ENVO: 'dev', BASEURL: 'https://xxxx.xxxx.com/api/', APP_ENV: 'dev' }
// for(let key in oriEnv) {
//     defineEnv[`process.env.${key}`] = JSON.stringify(oriEnv[key])
// }

module.exports = {
    entry: path.join(__dirname, '../src/index.tsx'),
    output: {
        filename: `js/[name].[${webpackSettings.isHash}].js`,
        path: path.join(__dirname, '../dist'),
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                include: path.join(__dirname, '../src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    webpackSettings.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    'postcss-loader',
                ]
             },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            //1024 == 1kb  
                            //小于10kb时打包成base64编码的图片否则单独打包成图片
                            limit: 10240,
                            name: path.join('img/[name].[hash:7].[ext]'),
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            name: path.join('font/[name].[hash:7].[ext]'),
                        }
                    }
                ]
            },
            {
                // for ant design
                test: /\.less$/,
                include: path.join(__dirname, '../node_modules'),
                use: [
                    webpackSettings.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            modifyVars: antdTheme,
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // new webpack.DefinePlugin(defineEnv),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx']
    },
}