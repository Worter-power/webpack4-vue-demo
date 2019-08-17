const base=require('./webpack.config.base')
const merge=require('webpack-merge')
const webpack=require('webpack')
const config = require('./config')
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

console.log('============================================================================')
console.log('port:', config.devServer.port)
console.log('Node.js:', process.version)
console.log('Local:', 'http://localhost:'+config.devServer.port)
console.log('Local:', 'http://127.0.0.1:'+config.devServer.port)
console.log('External:', `http://${config.myip}:${config.devServer.port}`)
console.log('============================================================================')

module.exports=merge(base,{
    externals: config.externalsObject,
    devServer: config.devServer,
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        // new DashboardPlugin(dashboard.setData)
    ]
})
