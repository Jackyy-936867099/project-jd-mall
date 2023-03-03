import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
//导入路由
import router from '@/router'
Vue.config.productionTip = false
Vue.use(VueRouter)

//引入element-ui
import {Button,MessageBox} from 'element-ui'
Vue.component(Button.name,Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//三级联动的组件--全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from "@/components/Pagination"
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

import '@/mock/serve'

//引入swiper样式
import 'swiper/css/swiper.css'
//统一引入api里面的函数
import * as API from '@/api'
import store from './store'
import atm from '@/assets/1.gif'

//引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:atm
})


//引入自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins)
//引入表单校验插件
import '@/plugins/validate'
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  },
  router:router,
  store
}).$mount('#app')


