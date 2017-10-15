import Vue from 'vue'
import Router from 'vue-router'

const asyncComponent = (name) => {
  return resolve => require([`@/components/${name}`], resolve)
}
const Login = asyncComponent('Login/Login')
const Home = asyncComponent('Home/Home')
const User = asyncComponent('User/User')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        requireLogin:false
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          path: '/',
          name: 'user',
          component: User,
          meta:{
            requireLogin:true
          }
        },
      ]
    },
  ]
})
