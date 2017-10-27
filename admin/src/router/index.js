import Vue from 'vue'
import Router from 'vue-router'

const asyncComponent = (name) => {
  return resolve => require([`@/components/${name}`], resolve)
}
const Login = asyncComponent('Login/Login')
const Home = asyncComponent('Home/Home')
const User = asyncComponent('User/User')
const Attribute = asyncComponent('Attribute/Attribute')
const Add = asyncComponent('Product/Add')
const Class = asyncComponent('Class/Class')
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
        {
          path: '/attribute',
          name: 'attribute',
          component: Attribute,
          meta:{
            requireLogin:true
          }
        },
        {
          path: '/product/add',
          name: 'addproduct',
          component: Add,
          meta:{
            requireLogin:true
          }
        },
        {
          path: '/class',
          name: 'class',
          component: Class,
          meta:{
            requireLogin:true
          }
        },
      ]
    },
  ]
})
