<template>
    <div class="home">
        <Welcome v-show="active == 0"></Welcome>
        <Center v-show="active == 3"></Center>
        <van-tabbar v-model="active" @change="change">
            <van-tabbar-item icon="wap-home">首页</van-tabbar-item>
            <van-tabbar-item icon="shop">分类</van-tabbar-item>
            <van-tabbar-item icon="cart" dot>购物车</van-tabbar-item>
            <van-tabbar-item icon="contact">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import Welcome from './Welcome'
import Center from '../Center/Center'
export default {
    data() {
        return {
            active: 0
        }
    },
    components:{
        Welcome,
        Center
    },
    methods: {
        change(num) {

        }
    }
}
</script>
<style lang="scss" scoped>
.home{
    padding-bottom: 50px;
}
</style>
