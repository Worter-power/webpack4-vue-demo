const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('./config')
const isProd = process.env.NODE_ENV == 'production';
module.exports = {
    //输入
    entry: {
        app: ['babel-polyfill', './src/index.js'],
    },
    //输出
    output: {
        path: path.join(__dirname, '../dist'),
        /**
         * 使用基于每个 chunk 内容的 hash： filename: "[chunkhash].bundle.js"
         * 使用内部 chunk id: filename: "[id].bundle.js"
         * 使用入口名称：filename: "[name].bundle.js"
         * 使用每次构建过程中，唯一的 hash 生成: filename: '[name].[hash].bundle.js'
         */
        filename: isProd ? 'js/[name].[contenthash].min.js' : 'js/[name].[hash:7].bundle.js',
        // require.ensure([], () => require(`./compnonts/home.vue`), 'home');
        chunkFilename: isProd ? 'js/[name].[contenthash].chunk.js' : 'js/[name].[hash:7].devchunk.js',
        publicPath: config[process.env.NODE_ENV].assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.vue'],
        alias: config.alias,
        modules: ['node_modules']
    },
    mode: process.env.NODE_ENV,

    module: {
        rules: [
            {
                test: /\.(jsx?|babel|es6)$/,
                include: process.cwd(),
                exclude: config.jsexclude,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(png|jpg|jepg|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,  //这里的单位是b
                            name: 'images/[name][hash].[ext]' //打包后输出路径
                        }
                    }
                ]
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    { loader: isProd ? MiniCssExtractPlugin.loader : "style-loader" },
                    { loader: "css-loader" },
                    { loader: "sass-loader" },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require("autoprefixer")
                            ]
                        }
                    }
                ]
            }
        ]
    },
    performance: {
        hints: "warning", // false 不展示警告或错误提示。 | "error" 将展示一条警告，通知你这是体积大的资源。在开发环境，我们推荐这样。| "warning"
        maxEntrypointSize: isProd ? 500*1024 : 10*1024*1024, 
        maxAssetSize: isProd ? 1*1024*1024 : 10*1024*1024,
    },
    stats: { // 统计信息(stats)
        children: false,
        warnings: isProd ? true : false,
        modules: false // 添加构建模块信息
    },
    plugins: [
        new VueLoaderPlugin(),
        new ProgressBarPlugin(),
        // 注册全局变量 以便在代码中使用
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
            favicon: './public/favicon.ico',
            inject: 'body', // js 挂在地方
            minify: {
                removeComments: true,// 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                removeAttributeQuotes: true, // 移除属性的引号
                minifyCSS: true// 压缩内联css
            }
        })
    ]
}
