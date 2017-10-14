<template>
  <div class="unlogin">
      <van-button size="normal" type="primary" @click="loginBox()">登录</van-button>
  </div>
</template>
<script>
export default {
  methods:{
      loginBox(){
          this.$store.commit('SHOW_LOGIN_BOX',true)
      }
  }
}
</script>

<style lang="scss" scoped>
.unlogin{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
