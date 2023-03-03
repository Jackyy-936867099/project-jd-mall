import { reqGetSearchInfo } from "@/api"

const actions={
    async getSearchList(context,params={}){
        //params形参，是当用户派发actions的时候第二个参数过来的，至少是一个空对象
        let result=await reqGetSearchInfo(params)
        if(result.code==200){
            context.commit('GETSEARCHLIST',result.data)
        }
    }
}
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
}
const state={
    count:1,
    searchList:{}
}
const getters={
    goodsList(state){
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    }
}
export default{
    actions,
    mutations,
    state,
    getters
}