<template>
    <div>
        <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不需要再引入 -->
        <TypeNav/>
        <ListContainer/>
        <Recommend/>
        <Rank/>
        <Like/>
        <Floor v-for="(floor,index) in floorList" :key="floor.id" :list='floor'/>
        <Brand/>
    </div>
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import {mapState} from 'vuex'

export default {
    name:'Home',
    components:{
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand
    },
    mounted(){
        //派发action，获取floor组件的数据
        this.$store.dispatch('getFloorList');
        //获取用户信息在首页展示
        this.$store.dispatch('getUserInfo')
    },
    computed:{
        ...mapState({
            floorList:state=>state.home.floorList
        })
    }
}
</script>

<style>

</style>