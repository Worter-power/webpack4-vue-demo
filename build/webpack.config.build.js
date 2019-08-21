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
        namedChunks: true,
        moduleIds: 'hashed',
        splitChunks: {
            // minChunks: 1,
            // cacheGroups: {
            //     styles: {
            //         name: 'styles',
            //         test: /\.(scss|css)$/,
            //         chunks: 'all',
            //         enforce: true
            //     },
            //     vendor: {
            //         test: /node_modules/,
            //         name: 'vendor',
            //         chunks: 'all'
            //     }
            // },
            // maxInitialRequests: 6,
            // cacheGroups: {
            //     dll: {
            //         chunks:'all',
            //         test: /[\\/]node_modules[\\/](jquery|core-js|vue|vue-router)[\\/]/,
            //         name: 'dll',
            //         priority: 2,
            //         enforce: true,
            //         reuseExistingChunk: true
            //     },
            //     superSlide: {
            //         chunks:'all',
            //         test: /[\\/]src[\\/]assets[\\/]js[\\/]/,
            //         name: 'superSlide',
            //         priority: 1,
            //         enforce: true,
            //         reuseExistingChunk: true
            //     },
            //     commons: {
            //         name: 'commons',
            //         minChunks: 2,//Math.ceil(pages.length / 3), 当你有多个页面时，获取pages.length，至少被1/3页面的引入才打入common包
            //         chunks:'all',
            //         reuseExistingChunk: true
            //     }
            // }
        },
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
