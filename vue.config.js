module.exports={
    productionSourceMap:false,
    lintOnSave:false,
    devServer: {
        proxy: {
             '/api': {
                  target: 'http://gmall-h5-api.atguigu.cn',
             },
        },
   },
   chainWebpack: config => {
     config.plugin('html').tap(args => {
         args[0].title = '京东'
         return args
     })
    }
}