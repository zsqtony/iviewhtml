/**
 * Created by zhangshaoqiang on 2018/11/1.
 */
module.exports = {
    baseUrl: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'https://manage.astu.cc/api',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}