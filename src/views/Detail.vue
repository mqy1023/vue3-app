<template>
  <div class="wrapper">
    <van-nav-bar
        title="页面传递id"
        left-arrow
        @click-left="handleBackClick"
    />
    <div>
      详情id为:{{currentId}}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
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
    let currentId = ref(0)
    currentId = route.params.id // 路由跳转id

    // 用于测试store
    Toast(store.state.chanceInfo)
    return { currentId, handleBackClick }
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
