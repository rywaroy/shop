<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="main" />
      </keep-alive>
    </transition>

    <transition name="slide-top">
      <LoginBox v-show="showLoginBox"></LoginBox>
    </transition>

  </div>
</template>

<script>
import LoginBox from './components/Login/LoginBox'
import { mapState } from 'vuex'
export default {
  name: 'app',
  data(){
    return{
      transitionName:''
    }
  },
  components: {
    LoginBox
  },
  computed: mapState({
    showLoginBox: state => state.showLoginBox,  //
  }),
  watch: {
    '$route'(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

