const base = require('./webpack.config.base')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const AssetsPlugin = require(' assets-webpack-plugin')
const config = require('./config')

module.exports = merge(base, {
    externals: config.externals,
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                },
                vendor: {
                    test: /node_modules/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ 
            filename: 'css/[name].[contenthash].min.css',
            chunkFilename: 'css/[id].[contenthash].min.css',
        }),
        // 输出资源清单
        new ManifestPlugin(),
        new AssetsPlugin()
    ]
})
