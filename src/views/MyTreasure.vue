<template>
  <div class="wrapper">
    <van-nav-bar
            title="我的夺宝"
            left-arrow
            :z-index="9999"
            @click-left="handleBackClick"
            :border="false"
            :fixed="true"
    />
    <van-tabs v-model:active="active" sticky offset-top="46">
      <van-tab v-for="(tab, index)  in tabList"
               :title="tab.name"
               :key="index">
        <div class="list__wrapper">
          <van-list
                  v-model:loading="state.loading"
                  :finished="state.finished"
                  finished-text="没有更多了"
                  @load="onLoad"
          >
            <van-cell v-for="item in state.list" :key="item" :title="item" />
          </van-list>
        </div>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { reactive, toRefs, createApp, ref } from 'vue'
import { Tab, Tabs, List } from 'vant'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../utils/request'
const app = createApp()
app.use(Tab).use(Tabs).use(List)

// 获取当前商铺信息
const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}

// 点击回退逻辑
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return handleBackClick
}

export default {
  name: 'MyTreasure',
  components: {},
  setup () {
    const active = ref(0)
    const tabList = reactive([
      { name: '进行中' }, { name: '待揭晓' }, { name: '已揭晓' }
    ])
    const state = reactive({
      list: [],
      loading: false,
      finished: false
    })
    const { item, getItemData } = useShopInfoEffect()
    const handleBackClick = useBackRouterEffect()
    getItemData()

    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 20; i++) {
          state.list.push(state.list.length + 1)
        }

        // 加载状态结束
        state.loading = false

        // 数据全部加载完成
        if (state.list.length >= 60) {
          state.finished = true
        }
      }, 3000)
    }
    return { active, tabList, state, onLoad, item, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/viriables.scss';
  .wrapper {
    height: 100vh;
  }
  .list__wrapper {
    padding-top: 44px;
  }
</style>
