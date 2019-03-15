const path = require("path");

const resolve = dir => {
  return path.join(__dirname, dir);
};
module.exports = {
  publicPath: "",
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("_c", resolve("src/components"))
      .set("_v", resolve("src/views"))
      .set("_u", resolve("src/utils"));
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: '地址',
  //       changeOrigin: true,
  //       ws: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   }
  // }
};
