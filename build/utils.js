const net = require('net');
const co = require('co');
const path = require('path');
// 检测端口是否被占用 node portIsOccupied.js -p [port]
exports.portIsOccupied = async (port)=> {
    // 创建服务并监听该端口

    let canUsePort = true;
    co(function *() {
        const server = net.createServer().listen(port)
        server.on('listening', ()=> { // 执行这块代码说明端口未被占用
            server.close() // 关闭服务
        })
        server.on('error', (err)=> {
            console.log(err)
            if (err.code === 'EADDRINUSE') { // 端口已经被使用
                canUsePort = false
                console.log('The port【' + port + '】 is occupied, please change other port.')
            }
        })
    })
    return canUsePort
}

// 获取多入口
// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
var glob = require('glob')
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的page文件夹
var PAGE_PATH = path.resolve(__dirname, '../src/singlePage')
// 用于做相应的merge处理
var merge = require('webpack-merge')

//多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
exports.entries = function () {
    var entryFiles = glob.sync(PAGE_PATH + '/*.js')
    var map = {}
    entryFiles.forEach((filePath) => {
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        map[filename] = [filePath]
    })
    return map
}