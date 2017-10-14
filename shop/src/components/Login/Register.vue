<template>
    <div class="register">
        <van-cell-group>
            <van-field v-model="account" label="手机" placeholder="请输入手机" required>
            </van-field>

            <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required>
            </van-field>

            <van-field v-model="repwd" type="password" label="确认密码" placeholder="请确认密码" required>
            </van-field>

            <van-field v-model="nickname" label="昵称" placeholder="请输入昵称">
            </van-field>
        </van-cell-group>
        <van-button size="large" type="primary" style="margin-top:.5rem" @click="reg()">注册</van-button>
        <div class="tip">已有账号？
            <span @click="showLogin()">登录</span>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            account: '',
            password: '',
            repwd: '',
            nickname: ''
        }
    },
    methods: {
        showLogin() {
            this.$store.commit('SHOW_LOGIN_BOX_TYPE', 0)
        },
        reg() {
            if (!this.account) {
                this.$toast('请输入手机号')
                return;
            }
            if (!this.password) {
                this.$toast('请输入密码')
                return;
            }
            if (this.password != this.repwd) {
                this.$toast('密码不一致')
                return;
            }
            if (!this.nickname) {
                this.$toast('请输入昵称')
                return;
            }
            let _this = this;
            this.$http.post('/user/reg', {
                account: _this.account,
                password: _this.password,
                nickname: _this.nickname
            }).then(res => {
                _this.$toast('注册成功')
                this.$store.commit('SHOW_LOGIN_BOX_TYPE', 0)
                _this.account = ''
                _this.password = ''
                _this.repwd = ''
                _this.nickname = ''
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.register {
    width: 100%;
    height: 100%;
}

.tip {
    margin-top: 0.5rem;
    text-align: center;
    font-size: .3rem;
    span {
        color: red;
    }
}
</style>
