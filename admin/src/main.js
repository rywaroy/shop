// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/css/reset.css'
import store from './store'
import Axios from './server/index'
import plus from './public'
Vue.prototype.$http = Axios
Vue.config.productionTip = false
Vue.use(ElementUI)

import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
/* eslint-disable no-new */
Vue.prototype.plus = plus
router.beforeEach((to,from,next) => {
  if(to.matched.some(res => res.meta.requireLogin)){  //判断页面是否需要登录
    if(store.state.adminInfo.account){
      next();
    }else{
      Message('您还未登录');
      setTimeout(function () {
        router.push({name:'login'})
      },1000)
    }
  }else{
    next()
  }
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>', 
  components: { App }
})
