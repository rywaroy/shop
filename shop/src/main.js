// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/css/reset.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import plus from './public'
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import store from './store'
import Axios from './server/index'
import { Toast } from 'vant';
// import FastClick from 'fastclick'
plus.set_font(750)   //rem
Vue.use(Vant)
Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.prototype.$toast = Toast
Vue.prototype.plus = plus
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
