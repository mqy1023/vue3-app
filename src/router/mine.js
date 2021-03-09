
const Tabbar = () =>
  import(/* webpackChunkName: "TabBar" */ '../components/TabBar')

export default [
  {
    path: '/mine',
    name: 'mine',
    components: {
      default: () => import(/* webpackChunkName: "mine" */ '../views/Mine.vue'),
      tabbar: Tabbar
    },
    meta: {
      login: true
    }
  }
]
