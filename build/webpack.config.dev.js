const base = require('./webpack.config.base')
const merge = require('webpack-merge')
const webpack = require('webpack')
const config = require('./config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
/**
 * 
 * webpack-dashboard是用于改善开发人员使用webpack时控制台用户体验的一款工具。
 * 它摒弃了webpack（尤其是使用dev server时）在命令行内诸多杂乱的信息结构，
 * 为webpack在命令行上构建了一个一目了然的仪表盘(dashboard)，
 * 其中包括构建过程和状态、日志以及涉及的模块列表。有了它，
 * 你就可以更加优雅的使用webpack来构建你的代码。
    简单地说，webpack-dashboard就是把原先你使用webpack时（特别是使用webpack dev server时）
    命令行控制台打印的日志进行优化显示
 */
// const Dashboard = require('webpack-dashboard');
// const DashboardPlugin = require('webpack-dashboard/plugin');
// const dashboard = new Dashboard();

// friendly-errors-webpack-plugin 取代这部分
// console.log('============================================================================')
// console.log('port:', config.devServer.port)
// console.log('Node.js:', process.version)
// console.log('Local:', 'http://localhost:' + config.devServer.port)
// console.log('Local:', 'http://127.0.0.1:' + config.devServer.port)
// console.log('External:', `http://${config.myip}:${config.devServer.port}`)
// console.log('============================================================================')

module.exports = merge(base, {
    externals: config.externalsObject,
    devServer: config.devServer,
    devtool: '(none)',
    plugins: [
        new webpack.NamedModulesPlugin(), // 打印更新的模块路径
        new webpack.HotModuleReplacementPlugin(), // 热更新插件
        // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
        new webpack.NoEmitOnErrorsPlugin(),
        // new DashboardPlugin(dashboard.setData)
        // 友好的终端错误显示方式
        new FriendlyErrorsPlugin({
            // 运行成功
            compilationSuccessInfo: {
                message: [`你的应用程序在这里运行：http://${config.myip}:${this.port}`],
                notes:[
                    '============================================================================',
                    'name\t: ' + config.name,
                    'port\t: ' + config.devServer.port,
                    'Node.js\t: ' + process.version,
                    'Local\t: ' + 'http://localhost:' + config.devServer.port,
                    'Local\t: ' + 'http://127.0.0.1:' + config.devServer.port,
                    'External\t: ' + `http://${config.myip}:${config.devServer.port}`,
                    '============================================================================'
                ]
            },
            //  运行错误
            onErrors: function (severity, errors) {
                // 可以收听插件转换和优先级的错误
                // 严重性可以是'错误'或'警告'
                if (severity !== 'error') {
                    return;
                }
                const error = errors[0];
                notifier.notify({
                    title: "Webpack error",
                    message: severity + ': ' + error.name,
                    subtitle: error.file || '',
                    // icon: ICON
                });
            },
            //是否每次编译之间清除控制台
            //默认为true
            clearConsole: true,
        })
    ]
})
