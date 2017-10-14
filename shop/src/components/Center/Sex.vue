<template>
    <div class="sex">
        <my-header title="修改性别" :fix="fix"></my-header>
        <div class="van-radios">

            <van-radio-group v-model="sex">
                <van-cell-group>
                <van-cell><van-radio name="0">保密</van-radio></van-cell>
                <van-cell><van-radio name="1">男</van-radio></van-cell>
                <van-cell><van-radio name="2">女</van-radio></van-cell>
                </van-cell-group>
            </van-radio-group>
            <van-button size="large" type="primary" style="margin-top:.5rem" @click="change()">修改</van-button>
        </div>
    </div>
</template>
<script>
import Header from '../Common/Header'
export default {
    data() {
        return {
            fix: false,
            sex: ''
        }
    },
    activated() {
        this.sex = this.$store.state.userInfo.sex
    },
    components: {
        'my-header': Header
    },
    methods: {
        change() {
            if (!this.sex) {
                this.$toast('请选择性别')
                return;
            }
            let _this = this;
            this.$http.post('/user/sex', {
                sex: _this.sex
            }).then(function(res) {
                _this.$store.commit('SET_USERINFO', res.data.data)
                window.localStorage.setItem('userInfo',JSON.stringify(res.data.data))
                _this.$toast('修改成功');
                _this.$router.go(-1);

            })
        }
    }
}
</script>