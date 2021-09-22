
const Tabbar = () =>
  import(/* webpackChunkName: "TabBar" */ '../components/TabBar')

export default [
  {
    path: '/cate',
    name: 'cate',
    components: {
      default: () => import(/* webpackChunkName: "mine" */ '../views/cate/Cate.vue'),
      tabbar: Tabbar
    },
    meta: {
      login: false
    }
  }
]
