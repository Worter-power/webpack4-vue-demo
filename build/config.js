const path = require('path');
const fs = require('fs');
const ip = require('ip');
const nodeExternals = require('webpack-node-externals');
const webpackConfig = require('../webpack.config');
const utils = require('./utils');

exports.eslink = webpackConfig.openEslink;
exports.name = webpackConfig.name;
// 本机IP
exports.myip = ip.address();
// 多入口
exports.entries = utils.entries();
// 文件输出路径
exports.assetsRoot = path.resolve(__dirname, '../dist/');
// 生产环境配置
exports.production = {
    assetsSubDirectory: '',
    assetsPublicPath: webpackConfig.buildPublicPath,
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report,
    overwriteAssetsPublicPath: true
};
// 开发环境配置
exports.development = {
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    cssSourceMap: false
}

// devServer
exports.devServer = {
    host: '127.0.0.1',
    port: webpackConfig.port,
    publicPath: webpackConfig.publicPath,
    open: webpackConfig.open, // 开启浏览器
    hot: true, // 开启热更新
    contentBase: webpackConfig.contentBase,
    compress: true,
    // progress: true,
    inline: true, // 构建消息是否会出现在浏览器控制台  :: 如果为false 浏览器则不会自动刷新
    proxy: webpackConfig.proxy,
    stats: "errors-only",
    overlay: {
        warnings: true,
        errors: true
    }
}

// resolve.alias
exports.alias = {
    'vue$': 'vue/dist/vue.esm.js',
    '@': path.join(__dirname, '..', 'src'),
    'src': path.join(__dirname, '..', 'src'),
    'static': path.join(__dirname, '..', 'static'),
    'api': path.join(__dirname, '..', 'src/api'),
    'PAGE': path.join(__dirname, '..', 'src/page'),
    'VUEX': path.join(__dirname, '..', 'src/vuex'),
    'root': path.join(__dirname, '..', '')
};
// 忽略打包的node插件
var externals = {
    jquery: 'window.jQuery',
    axios: 'axios',
    moment: 'moment',
    lodash: '_',
    qs: 'Qs',
    echarts: 'echarts',
    sortablejs: 'Sortable',
    'js-cookie': 'Cookies',
    screenfull: 'screenfull',
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    'vue-i18n': 'VueI18n',
    'element-ui': 'ELEMENT'
};
exports.externalsObject = externals;
exports.externals = [externals, nodeExternals()];
exports.jsexclude = /node_modules/;