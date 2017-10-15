<template>
    <div class="login">
        <div class="login-form">
            <el-input v-model="account" placeholder="密码" style="margin-bottom:20px"></el-input>
            <el-input v-model="password" type="password" placeholder="账号" style="margin-bottom:20px"></el-input>
            <el-button type="primary" size="large" style="width:100%" @click="login()">主要按钮</el-button>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            account: '',
            password: ''
        }
    },
    methods:{
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
                window.localStorage.setItem('adminInfo',JSON.stringify(res.data.data));
                window.localStorage.setItem('token',res.data.data.token)
                _this.$store.commit('SET_ADMININFO',res.data.data)
                _this.$router.push({path:'/'})
                _this.$message('登录成功')
            })
      }
    }
}
</script>

<style lang="scss" scoped>
.login-form {
    width: 300px;
    margin: 200px auto;
}
</style>
