const base = require('./webpack.config.base')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 压缩 JS
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩 css
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('./config')

module.exports = merge(base, {
    externals: config.externals,
    optimization: {
        // splitChunks: {
        //     minChunks: 5,
        //     cacheGroups: {
        //         styles: {
        //             name: 'styles',
        //             test: /\.(scss|css)$/,
        //             chunks: 'all',
        //             enforce: true
        //         },
        //         vendor: {
        //             test: /node_modules/,
        //             name: 'vendor',
        //             chunks: 'all'
        //         }
        //     }
        // },
        minimizer: [ // 用于配置 minimizers 和选项
            // webpack 不支持es6语法的压缩，这里要使用需要babel配合
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false // set to true if you want JS source maps
            }),// 压缩 js
            new OptimizeCSSAssetsPlugin({}), // 压缩 css
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ 
            filename: 'css/[name].[contenthash].min.css',
            chunkFilename: 'css/[id].[contenthash].min.css',
        }),
        // 输出资源清单
        new ManifestPlugin(),
        new AssetsPlugin(),
        // 打包生成报告单
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'static',
        //     //  是否在默认浏览器中自动打开报告
        //     openAnalyzer: false,
        //     //  将在“服务器”模式下使用的端口启动HTTP服务器。
        //     analyzerPort: 9528, 
        //     reportFilename: 'static/report.html',
        // })
    ]
})
