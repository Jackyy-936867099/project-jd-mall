//当前模块，所有api接口进行统一管理
import requests from "./request";

import mockRequest from './mockRequest'
//三级联动的接口
///api/product/getBaseCategoryList get 无参数

export const reqCategoryList=()=>{
    return requests({url:'/product/getBaseCategoryList',methods:'get'})
}

//获取banner（Home首页轮播图的接口）
export const reqGetBannerList=()=>mockRequest.get('/banner')

//获取floor组件的数据
export const reqFloorList=()=>mockRequest.get('/floor')

//获取搜索模块数据 地址：/api/list 请求方式post 需要带参数
/*
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
//当前函数需要带参
//当前接口，给服务器传递的参数至少是一个空对象
export const reqGetSearchInfo=(params)=>requests({
    url:'/list',
    method:'post',
    data:params
})

//获取商品详情信息的接口
export const reqGoodsInfo=(skuId)=>requests({
  url:`/item/${skuId}`,
  method:'get'
})

//将产品添加到购物车中(获取更新某一个产品的个数)
///api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

//获取购物车列表数据的接口
export const reqCartList=()=>requests({url:'/cart/cartList',method:'get'})

//删除购物车产品的接口
export const reqDeleteCartById=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//修改商品选中的状态
///api/cart/checkCart/{skuId}/{isChecked} get
export const reqUpdateCheckeById=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码
//url：/api/user/passport/sendCode/{phone}
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册的接口
//url:/api/user/passport/register post
export const reqUserRegister=(data)=>requests({url:'/user/passport/register',data,method:'post'})

//登录
//url：/api/user/passport/login post
export const reqUserLogin=(data)=>requests({url:'/user/passport/login',data,method:'post'})

//获取用户的信息，需要带着用户的token像服务器要用户信息
//url:/api/user/passport/auth/getUserInfo get
export const reqUserInfo=()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

//推出登录
//url：/api/user/passport/logout get
export const reqLogout=()=>requests({url:'/user/passport/logout',method:'get'})

//获取用户地址信息
//url:/api/user/userAddress/auth/findUserAddressList get
export const reqAddressInfo=()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

//获取商品清单
//url:/api/order/auth/trade get
export const reqOrderInfo=()=>requests({url:'/order/auth/trade',method:'get'})

//提交订单
//url:/api/order/auth/submitOrder?tradeNo={tradeNo} post
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//获取订单支付信息
//url:/api/payment/weixin/createNative/{orderId} get
export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//获取支付订单状态
//url:/api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//获取我的订单列表
//url:/api/order/auth/{page}/{limit} get
export const reqMyorderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})