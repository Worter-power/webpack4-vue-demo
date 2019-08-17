const net = require('net');
const co = require('co');
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