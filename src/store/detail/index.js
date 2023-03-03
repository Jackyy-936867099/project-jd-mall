import { reqGoodsInfo,reqAddOrUpdateShopCart} from "@/api"
//封装游客身份的模块uuid-->生成一个随机字符串（不能再变了）
import {getUUID} from '@/utils/uuid_token'

const actions={
    //获取产品信息的actions
    async getGoodInfo(context,skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code==200){
            context.commit('GETGOODINFO',result.data)
        }
    },
    //将产品添加到购物车中
    //加入购物车以后前台将参数带给服务器，并没有返回数据，所以不要写mutation和state了
    async addOrUpdateShopCart(context,{skuId,skuNum}){
        let result=await reqAddOrUpdateShopCart(skuId,skuNum)
        //当前这个函数执行之后返回promise
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo
    }
}
const state={
    goodInfo:{},
    //游客的临时身份
    uuid_token:getUUID()
}
const getters={
    categoryView(state){
        return state.goodInfo.categoryView||{}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }
}
export default{
    actions,
    mutations,
    state,
    getters
}