const Tabbar = () =>
  import(/* webpackChunkName: "TabBar" */ '../components/TabBar')

export default [
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '/',
    name: 'home',
    components: {
      default: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
      tabbar: Tabbar
    },
    meta: {
      keepAlive: true,
      login: false
    }
  },
  {
    path: '/treasure',
    name: 'treasure',
    component: () => import(/* webpackChunkName: "MyTreasure" */ '../views/MyTreasure.vue'),
    meta: {
      login: true
    }
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import(/* webpackChunkName: "MyTreasure" */ '../views/Detail.vue'),
    meta: {
      login: true
    }
  }, {
    path: '/qdetail',
    name: 'querydetail',
    component: () => import(/* webpackChunkName: "QueryDetail" */ '../views/QueryDetail.vue'),
    meta: {
      login: true
    }
  }
]
