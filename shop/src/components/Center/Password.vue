<template>
    <div class="password">
        <my-header title="修改密码" :fix="fix"></my-header>
        <van-cell-group>
            <van-field v-model="oldpwd" type="password" label="旧密码" placeholder="请输入旧密码" >
            </van-field>
            <van-field v-model="password" type="password" label="新密码" placeholder="请输入新密码" >
            </van-field>
            <van-field v-model="spwd" type="password" label="确认密码" placeholder="确认密码" >
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
            oldpwd: '',
            password:'',
            spwd:''
        }
    },
    activated() {
        this.nickname = this.$store.state.userInfo.nickname
    },
    components: {
        'my-header': Header
    },
    methods: {
        change() {
            if (!this.oldpwd) {
                this.$toast('请输入旧密码')
                return;
            }
            if (!this.password) {
                this.$toast('请输入新密码')
                return;
            }
            if (this.password != this.spwd) {
                this.$toast('密码不一致')
                return;
            }
            let _this = this;
            this.$http.post('/user/password', {
                password: _this.password,
                oldpwd: _this.oldpwd
            }).then(function(res) {
                _this.$store.commit('SET_USERINFO',{})
                window.localStorage.removeItem('userInfo')
                _this.$toast('修改成功，请重新登录')
                _this.$router.go(-1);

            })
        }
    }
}
</script>

