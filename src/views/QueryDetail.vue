<template>
  <div class="wrapper">
    <van-nav-bar
        title="query页面传递参数"
        left-arrow
        @click-left="handleBackClick"
    />
    <div>
      详情name为:{{name}}
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

// 点击回退逻辑
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return handleBackClick
}

export default {
  name: 'Detail',
  components: {},
  setup () {
    const store = useStore()
    const handleBackClick = useBackRouterEffect()
    const route = useRoute()
    const { name } = route.query
    console.log('name==', name)

    // 用于测试store
    Toast(store.state.chanceInfo)
    return { name, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/viriables.scss';
.wrapper {
  position: relative;
  height: 100vh;
}
</style>
