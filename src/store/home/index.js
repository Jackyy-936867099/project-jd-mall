import { reqCategoryList,reqGetBannerList,reqFloorList} from "@/api"
const actions={
    async categoryList(context){
        let result = await reqCategoryList()
        if(result.code==200){
            context.commit('CATEGORYLIST',result.data)
        }
    },
    async getBannerList(context){
        let result = await reqGetBannerList()
        if(result.code==200){
            context.commit('GETBANNERLIST',result.data)
        }
    },
    //获取floor数据
    async getFloorList(context){
        let result =await reqFloorList()
        if(result.code==200){
            context.commit('GETFLOORLIST',result.data)
        }
    }
}
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList=floorList
    }
}
const state={
    //state中的数据默认初始值别瞎写
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const getters={
    
}
export default{
    actions,
    mutations,
    state,
    getters
}