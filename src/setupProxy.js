// const proxy=require("http-proxy-middleware");
const {
    createProxyMiddleware
} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware("/api", {
        target: "http://www.web-jshtml.cn/api/react",
        changeOrigin: true,
        pathRewrite: {
            "^/api": ""
        }
    }))
    // app.use(proxy("/message/api",{
    //     target:"http:",
    //     changeOrigin:true,
    // }))
}