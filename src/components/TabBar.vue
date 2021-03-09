<template>
  <van-tabbar
          route
          fixed
          v-model="active"
          active-color="#1989fa"
          safe-area-inset-bottom
          inactive-color="#999">
    <van-tabbar-item
            v-for="(tab, index) in tabBarList"
            :to="tab.path"
            :key="index">
      <div class="tabbar-content">
        <span class="iconfont" v-html="tab.icon" />
        <span>{{tab.name}}</span>
      </div>

    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
import 'vant/lib/tabbar/style'
import 'vant/lib/tabbar-item/style'
import { reactive, ref, toRefs } from 'vue'
export default {
  setup () {
    const active = ref(0)
    const state = reactive({
      tabBarList: [
        {
          name: '首页',
          path: '/',
          icon: '&#xe6f3;',
          pathName: 'home'
        },
        {
          name: '我的',
          path: '/mine',
          icon: '&#xe660;',
          pathName: 'about'
        }
      ]
    })
    return { ...toRefs(state), active }
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
}
</script>
<style lang="scss">
  .tabbar-content {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .iconfont {
    font-size: 0.42rem;
    margin-bottom: 0.1rem;
  }
</style>
