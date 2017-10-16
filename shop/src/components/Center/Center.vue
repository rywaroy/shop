<template>
  <div class="my">
    <div v-if="userInfo.account">
      <!-- <input type="file" @change="Acardpic($event)"> -->
      <van-cell-group>
        <van-cell title="头像">
          <div class="avatar bg-cover" slot="right-icon" :style="{backgroundImage:'url('+avatar+')'}">
            <input type="file" @change="Acardpic($event)">
          </div>
        </van-cell>
        <van-cell title="账号" :value="userInfo.account"></van-cell>
        <van-cell title="昵称" :value="userInfo.nickname" is-link @click="link('nickname')"></van-cell>
        <van-cell title="性别" :value="sex" is-link @click="link('sex')"></van-cell>
        <van-cell title="积分" :value="userInfo.integral"></van-cell>
        <van-cell title="身份" :value="userType"></van-cell>
        <van-cell title="修改密码" is-link @click="link('password')"></van-cell>
      </van-cell-group>
    </div>
    <UnLogin v-else></UnLogin>
  </div>
</template>
<script>
import UnLogin from '../Common/UnLogin'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  components: {
    UnLogin
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,  //用户信息
    }),
    ...mapGetters([
      'sex',
      'userType',
      'avatar'
    ])
  },
  methods: {
    Acardpic: function(imgFile) {
      var filextension = imgFile.target.value.substring(imgFile.target.value.lastIndexOf("."), imgFile.target.value.length);
      filextension = filextension.toLowerCase();
      var file = imgFile.target.files[0], fileSize = 0;
      fileSize = file.size / 1024
      if (fileSize > 2048) {
        this.$toast("不能超过2mb");
        return false;
      }
      if ((filextension != '.jpg') && (filextension != '.gif') && (filextension != '.jpeg') && (filextension != '.png') && (filextension != '.bmp')) {
        this.$toast("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢!");
        return false;
      }
      var _this = this;
      var fd = new FormData();
      fd.append("avatar", file);
      axios({
        method: 'post',
        url: _this.plus.path + '/file/avatar',
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: fd
      }).then(function(res) {
        _this.setAvatar(res.data.data.filename)
      })
    },
    setAvatar(imgurl) {
      let _this = this;
      this.$http.post('/user/avatar', {
        imgurl: imgurl
      }).then(function(res) {
        window.localStorage.setItem('userInfo',JSON.stringify(res.data.data))
        _this.$store.commit('SET_USERINFO',res.data.data)
      })
    },
    link(url){
      this.$router.push({name:url})
    }
  }
}
</script>

<style lang="scss" scoped>
.my {
  width: 100%;
  height: 100%;
}

.avatar {
  width: 0.8rem;
  height: 0.8rem;
  position: relative;
  float: right;
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    left: 0;
    top: 0;
  }
}
</style>
