<template>
    <div class="loginbox">
        <van-nav-bar :title="title">
            <div class="header-left" slot="left" @click="hideLoginBox()">
                <i class="van-nav-bar__arrow van-icon van-icon-arrow"></i>
            </div>
        </van-nav-bar>
        <Login v-show="showLoginBoxType == 0"></Login>
        <Register v-show="showLoginBoxType == 1"></Register>
    </div>
</template>
<script>
import Login from './Login'
import Register from './Register'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            title: '登录',
            show: 0
        }
    },
    watch:{
        showLoginBoxType(){
            if(this.showLoginBoxType == 0){
                this.title = '登录'
            }else{
                this.title = '注册'
            }
        }
    },
    components: {
        Login,
        Register
    },
    methods: {
        hideLoginBox() {
            this.$store.commit('SHOW_LOGIN_BOX', false)
        }
    },
    computed: mapState({
        showLoginBoxType: state => state.showLoginBoxType,  //
    }),
}
</script>

<style lang="scss" scoped>
.loginbox {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
    background: #fff;
    padding-top: 46px;
}
</style>
