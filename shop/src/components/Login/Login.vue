<template>
    <div class="login">
        <van-cell-group>
            <van-field v-model="account" label="手机" icon="clear" placeholder="请输入手机" required @click-icon="username = ''">
            </van-field>

            <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required>
            </van-field>
        </van-cell-group>
        <van-button size="large" type="primary" style="margin-top:.5rem" @click="login()">登录</van-button>
        <div class="tip">没有账号？ <span @click="showRegister()">注册</span></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            account:'',
            password:''
        }
    },
  methods:{
      showRegister(){
          this.$store.commit('SHOW_LOGIN_BOX_TYPE',1)
      },
      login(){
          if(!this.account){
                this.$toast('请输入手机号')
                return;
            }
            if(!this.password){
                this.$toast('请输入密码')
                return;
            }
            let _this = this;
            this.$http.post('/user/login',{
                account:_this.account,
                password:_this.password
            }).then(res => {               
                window.localStorage.setItem('userInfo',JSON.stringify(res.data.data));
                window.localStorage.setItem('token',res.data.data.token)
                _this.$store.commit('SET_USERINFO',res.data.data)
                _this.$toast('登录成功')
                _this.$store.commit('SHOW_LOGIN_BOX', false)
                _this.account = ''
                _this.password = ''
            })
      }
  }
}
</script>

<style lang="scss" scoped>
    .tip{
        margin-top: 0.5rem;
        text-align: center;
        font-size: .3rem;
        span{
            color: red;
        }
    }
</style>
