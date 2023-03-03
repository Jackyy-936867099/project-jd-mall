import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from "@/api"

const actions={
  //获取验证码
  async getCode({commit},phone){
    let result=await reqGetCode(phone)
    if(result.code==200){
        commit("GETCODE",result.data)
        return 'ok'
    }else{
        return Promise.reject(new Error(result.message))
    }
  },
  //用户注册
  async userRegister({commit},user){
    let result=await reqUserRegister(user)
    if(result.code==200){
        return 'ok'
    }else{
        return Promise.reject(new Error(result.message))
    }
  },
  //登录业务
  async userLogin({commit},data){
    let result=await reqUserLogin(data)
    //服务器下发token，用户的唯一标识符(uuid)
    //将来经常通过带token找服务器要用户信息进行展示
    if(result.code==200){
        commit('USERLOGIN',result.data.token)
        //持久化存储token
        localStorage.setItem('TOKEN',result.data.token)
        return 'ok'
    }else{
        return Promise.reject(new Error(result.message))
    }
  },
  //获取用户信息
  async getUserInfo({commit}){
      let result=await reqUserInfo()
      if(result.code==200){
          //用户已经登录成功并且获取到token
          commit('GETUSERINFO',result.data)
          return 'ok'
      }else{
          return Promise.reject(new Error(result.message))
      }
  },
  //退出登录
  async userLogout({commit}){
    let result=await reqLogout()
    if(result.code==200){
        //action里面不能操作state，得提交到mutation
        commit('USERLOGOUT')
        return 'ok'
    }else{
        return Promise.reject(new Error(result.message))
    }
  }
}
const mutations={
   GETCODE(state,code){
    state.code=code
   },
   USERLOGIN(state,token){
    state.token=token
   },
   GETUSERINFO(state,userInfo){
       state.userInfo=userInfo
   },
   //清除本地存储
   USERLOGOUT(state){
    state.userInfo=''
    state.token=''
    localStorage.removeItem('TOKEN')
   }
}
const state={
    code:'',
    token:localStorage.getItem('TOKEN'),
    userInfo:{}
}
const getters={
   
}
export default{
    actions,
    mutations,
    state,
    getters
}