<template>
  <div id="page">
    <router-view v-slot="{ Component }">
      <keep-alive include="Home,News">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <router-view name="tabbar"></router-view>
  </div>
</template>
<script>
// import { useRoute } from 'vue-router'
export default {
  name: 'app',
  setup () {
    return {
    }
  }
}
</script>
<style lang="scss">
#page {
  height: 100vh;
}
</style>
