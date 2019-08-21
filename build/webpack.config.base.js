const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('./config')
const isProd = process.env.NODE_ENV == 'production';
const Happypack = require("happypack");
const merge = require('webpack-merge')
const postcss = require('./postcss.config');
module.exports = {
    //输入
    entry: merge({
        app: ['babel-polyfill', './src/index.js'],
    }, isProd ? config.entries : {}),
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
        modules: [
            path.resolve(__dirname, "../src"),
            path.resolve(__dirname, "../node_modules")
        ] // 绝对路径;
    },
    mode: process.env.NODE_ENV,

    module: {
        /**
         * @param {防止 webpack 解析那些任何与给定正则表达式相匹配的文件。忽略的文件中不应该含有 import, require, define 的调用，或任何其他导入机制。忽略大型的 library 可以提高构建性能。} content 
         */
        noParse: function (content) {
            return /jquery|lodash/.test(content);
        },
        rules: [
            {
                test: /\.json$/,  //用于匹配loaders所处理文件拓展名的正则表达式
                use: 'json-loader', //具体loader的名称
                type: 'javascript/auto',
                exclude: config.jsexclude
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(png|jpg|gif|jepg|svg|webp)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192, // 小于8192字节的图片打包成base 64图片
                            outputPath: 'images/', //定义输出的图片文件夹
                            publicPath: 'images/',
                            name: '[name].[ext]' //打包后输出路径
                        }
                    }
                ]
            },
            {
                // 文件依赖配置项——字体图标
                test: /\.(woff|woff2|svg|eot|ttf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 8192,
                        name: 'fonts/[name].[ext]?[hash:8]',
                        publicPath: '',
                    },
                }],
            },
            {
                // 文件依赖配置项——音频
                test: /\.(wav|mp3|ogg)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 8192,
                        name: 'audios/[name].[ext]?[hash:8]',
                        publicPath: ''
                    },
                }],
            },
            {
                // 文件依赖配置项——视频
                test: /\.(ogg|mpeg4|webm)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 8192,
                        name: 'videos/[name].[ext]?[hash:8]',
                        publicPath: ''
                    },
                }],
            },
            {
                test: /\.css$/,
                exclude: config.jsexclude,
                use: [
                    { loader: isProd ? MiniCssExtractPlugin.loader : "style-loader" },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: postcss.plugins,
                            sourceMap: isProd ? false : true,
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                exclude: config.jsexclude,
                use: [
                    { loader: isProd ? MiniCssExtractPlugin.loader : "style-loader" },
                    { loader: "css-loader" },
                    { loader: "sass-loader", options: { sourceMap: isProd ? false : true } },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: postcss.plugins,
                            parser: 'postcss-scss',
                            sourceMap: isProd ? false : true,
                        }
                    },
                    // sass 全局变量和函数
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            sourceMap: isProd ? false : true,
                            resources: [
                                path.resolve(__dirname, 'src/assets/scssCommon/var.scss'),
                                path.resolve(__dirname, 'src/assets/scssCommon/mixin.scss'),
                            ]
                        }
                    }
                ]
            }
        ].concat(
            config.eslink ? [{
                test: /\.(js|jsx)$/,
                enforce: "pre", // 编译前检查
                exclude: config.jsexclude, // 不检测的文件
                include: path.resolve("src"), // 指定检查的目录
                use: "Happypack/loader?id=js"
                // use: [
                //     {
                //         loader: 'eslint-loader',
                //         options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
                //             formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
                //         }
                //     }
                // ]
            }] : [
                {
                    test: /\.(js|jsx)$/,
                    use: "Happypack/loader?id=js",
                    // use: [{
                    //     loader:'babel-loader',
                    //     options:{// options、query不能和loader数组一起使用
                    //         cacheDirectory: true// 利用缓存，提高性能，babel is slow
                    //     },
                    // }],
                    include: path.resolve(__dirname, 'src')
                }
            ]
        )
    },
    performance: {
        hints: "warning", // false 不展示警告或错误提示。 | "error" 将展示一条警告，通知你这是体积大的资源。在开发环境，我们推荐这样。| "warning"
        maxEntrypointSize: isProd ? 500 * 1024 : 10 * 1024 * 1024,
        maxAssetSize: isProd ? 1 * 1024 * 1024 : 10 * 1024 * 1024,
    },
    stats: { // 统计信息(stats)
        children: false,
        warnings: isProd ? true : false,
        providedExports: true,
        modules: false // 添加构建模块信息
    },
    plugins: [
        new Happypack({
            id: "js",
            use: [
                config.eslink ? {
                    loader: 'eslint-loader',
                    options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
                        formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
                    }
                } : {
                    loader: 'babel-loader',
                    options:{// options、query不能和loader数组一起使用
                        cacheDirectory: true// 利用缓存，提高性能，babel is slow
                    }
                }
            ]
        }),
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
            chunks: ['manifest', 'vendor', 'app'],
            minify: {
                removeComments: true,// 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                removeAttributeQuotes: true, // 移除属性的引号
                removeRedundantAttributes: true, // 删除多余的属性
                collapseBooleanAttributes: true, // 省略只有 boolean 值的属性值 例如：readonly checked
                minifyCSS: isProd ? true : false// 压缩内联css
            }
        })
    ],
    cache: true
}