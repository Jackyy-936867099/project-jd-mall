import { reqCartList,reqDeleteCartById,reqUpdateCheckeById} from "@/api"

const actions={
   //获取购物车列表的数据
   async getCartList(context){
       let result=await reqCartList()
       if(result.code==200){
           context.commit('GETCARTLIST',result.data)
       }
   },
   //删除购物车某一个产品
   async deleteCartListBySkuId({commit},skuId){
        let result=await reqDeleteCartById(skuId)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
   },
   //修改购物车某个产品的选中状态
   async updateCheckeById({commit},{skuId,isChecked}){
       let result=await reqUpdateCheckeById(skuId,isChecked)
       if(result.code==200){
           return 'ok'
       }else{
           return Promise.reject(new Error('faile'))
       }
   },
   //删除全部勾选的产品
   deleteAllCheckedCart({dispatch,getters}){
       let promiseAll=[]
       getters.cartList.cartInfoList.forEach(item => {
           if(item.isChecked==1){
            let result=dispatch('deleteCartListBySkuId',item.skuId)
            promiseAll.push(result)
           }
       });
       //只有p1，p2，p3返回的结果都成功Promise.all()才成功
       return Promise.all(promiseAll)
   },
   //修改全部产品的状态
   updateAllCartIsChecked({dispatch,state},isChecked){
       let promiseALL=[]
        state.cartList[0].cartInfoList.forEach(item=>{
           let promise= dispatch('updateCheckeById',{skuId:item.skuId,isChecked:isChecked})
           promiseALL.push(promise)
        })
        return Promise.all(promiseALL)
   }
}
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList
    }
}
const state={
    cartList:[]
}
const getters={
    cartList(state){
        return state.cartList[0]||{}
    }
}
export default{
    actions,
    mutations,
    state,
    getters
}