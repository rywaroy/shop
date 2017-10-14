import Vue from 'vue'
import Router from 'vue-router'

const asyncComponent = (name) => {
  return resolve => require([`@/components/${name}`], resolve)
}
const Home = asyncComponent('Home/Home')
const Nickname = asyncComponent('Center/Nickname')
const Sex = asyncComponent('Center/Sex')
const Password = asyncComponent('Center/Password')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path : '/',
      name:'home',
      component:Home
    },
    {
      path : '/center/nickname',
      name:'nickname',
      component:Nickname
    },
    {
      path : '/center/sex',
      name:'sex',
      component:Sex
    },
    {
      path : '/center/password',
      name:'password',
      component:Password
    },
  ]
})
