//对于axios进行二次封装
import axios from'axios'
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
//start方法：进度条开始，done方法进度条结束
//在当前模块中引入store
import store from '@/store'

//1:利用axios对象的方法create，去创建一个axios实例
const requests = axios.create({
    baseURL:'/api',
    timeout:5000,
})

//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    //config:配置对象，对象里面有一个属性很重要，headers请求头
    if(store.state.detail.uuid_token){
        config.headers.userTempId=store.state.detail.uuid_token
    }
    //需要携带token带给服务器
    if(store.state.user.token){
        config.headers.token=store.state.user.token
    }
    nprogress.start()
    return config
})
//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调函数：服务器相应数据回来之后，响应拦截器可以检测到，可以做一些事情
    nprogress.done()
    return res.data
},(error)=>{
    return new Error('faile!')
})

export default requests