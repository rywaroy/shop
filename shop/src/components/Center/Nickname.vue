<template>
    <div class="nickname">
        <my-header title="修改昵称" :fix="fix"></my-header>
        <van-cell-group>
            <van-field v-model="nickname" label="昵称" placeholder="请输入昵称" required>
            </van-field>
        </van-cell-group>
         <van-button size="large" type="primary" style="margin-top:.5rem" @click="change()">修改</van-button>
    </div>
</template>
<script>
import Header from '../Common/Header'
export default {
    data() {
        return {
            fix: false,
            nickname: ''
        }
    },
    activated(){
        this.nickname = this.$store.state.userInfo.nickname
    },
    components: {
        'my-header': Header
    },
    methods:{
        change(){
            if(!this.nickname){
                this.$toast('请输入昵称')
                return;
            }
            let _this = this;
            this.$http.post('/user/nickname',{
                nickname:_this.nickname
            }).then(function(res){
                _this.$store.commit('SET_USERINFO',res.data.data)
                window.localStorage.setItem('userInfo',JSON.stringify(res.data.data))
                _this.$toast('修改成功');
                _this.$router.go(-1);

            })
        }
    }
}
</script>
