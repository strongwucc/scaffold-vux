import Vue from 'vue'
import Router from 'vue-router'

const Home = r => require.ensure([], () => r(require('@/page/home')), 'home')//首页


Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },

    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        auth: 0,
        title: '首页'
      }
    }
  ]
})
