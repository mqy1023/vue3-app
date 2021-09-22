import {createRouter, createWebHashHistory} from 'vue-router'
import home from './home'
import cate from './cate'
import mine from './mine'
// import NotFound from '@/views/NotFound.vue'

import Login from '../views/login/Login'

const routes = [...home, ...cate, ...mine, {
  path: '/login',
  name: 'Login',
  component: Login
}]
const router = createRouter({
  history: createWebHashHistory(), // hash路由
  routes
})

// 路由守卫实现基础登陆校验功能
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  // (isLogin || to.name === 'Login') ? next() : next({ name: 'Login'})
  if (!isLogin && to.name.indexOf('Login') < 0 && to.meta.login) {
    next({ name: 'Login', query: { redirect: to.path } })
  } else {
    next()
  }
})

export default router
