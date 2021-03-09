import {createRouter, createWebHashHistory} from 'vue-router'
import home from './home'
import mine from './mine'
// import NotFound from '@/views/NotFound.vue'

const routes = [...home, ...mine]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
