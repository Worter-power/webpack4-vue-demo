const path = require('path');
module.exports = {
    openEslink: true,
    name: 'xx',
    buildPublicPath: '',
    port: 8080,
    publicPath: '/',
    open: false, // 开启浏览器
    contentBase: [
        path.join(__dirname, "public"), 
        path.join(__dirname, "static")
    ],
    proxy: {
        "/api": {
            "target": "http://10.0.0.221:18900",
            "changeOrigin": true,
            "pathRewrite": {
                "^/api": "/api"
            }
        },
        "/common": {
            "target": "http://1.shiyuesoft.com",
            "changeOrigin": true,
            "pathRewrite": {
                "^/common": "/common"
            }
        },
    }
}