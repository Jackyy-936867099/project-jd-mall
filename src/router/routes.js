// import Home from '@/pages/Home/index'
import Login from '@/pages/Login/index'
import Register from '@/pages/Register/index'
import Search from '@/pages/Search/index'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

//引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default [
    {
        path:'/home',
        component:()=>import("@/pages/Home"),//路由懒加载形式，只有当用户访问的时候才执行，加快运行速度
        meta:{show:true}
    },
    {
        path:'/search/:keyword?',
        component:Search,
        meta:{show:true},
        name:'search',
        props($route){
            return {keyword:$route.params.keyword,k:$route.query.k}
        }
    },
    {
        path:'/login',
        component:Login,
        meta:{show:false}
    },
    {
        path:'/register',
        component:Register,
        meta:{show:false}
    },
    {
        path:'/detail/:skuId',
        component:Detail,
        meta:{show:true}
    },
    {
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component:AddCartSuccess,
        meta:{show:true}
    },
    {
        path:'/shopcart',
        name:'shopcart',
        component:ShopCart,
        meta:{show:true}
    },
    {
        path:'/trade',
        component:Trade,
        meta:{show:true},
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path=='/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/pay',
        component:Pay,
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            if(from.path=='/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/paysuccess',
        component:PaySuccess,
        meta:{show:true}
    },
    {
        path:'/center',
        component:Center,
        meta:{show:true},
        children:[
            {
                path:'/center/myorder',
                component:MyOrder,
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        path:'*',
        redirect:'/home'
    }
]