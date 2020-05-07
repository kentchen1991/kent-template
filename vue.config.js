
const apiMocker = require('mocker-api');
const path = require('path');
module.exports = {
    publicPath: '/',
    devServer: {
        before(app){
            apiMocker(app, path.resolve('./src/mock/mocker.js'))
        }
    },
    lintOnSave: false,
    css: {
      loaderOptions: {
        postcss: {
          plugins: [
            require('postcss-pxtorem')({
              rootValue: 16, // 换算的基数
              selectorBlackList: [], // 忽略转换正则匹配项
              propList: ['*'],
            }),
          ]
        }
      },
    
    }
  }