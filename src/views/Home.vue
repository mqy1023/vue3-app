<template>
  <div class="home">
    <van-nav-bar
            title="vue3"
    />
    <div class="banner">
      <img class="banner__img"
           src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
      />
    </div>
    <div class="icons">
      <div class="icons__item"
           v-for="(item, index) in iconsList"
           :key="item.desc"
           @click="handleMenuClick(item.desc + index)"
      >
        <img class="icons__item__img"
             :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"
        />
        <p class="icons__item__desc">{{item.desc}}</p>
      </div>
    </div>
    <div class="flex-row-center lottery__content">
      <router-link
              v-for="item in nearbyList"
              :key="item._id"
              :to="`/detail/${item._id}`"
      >
        <HomeItem :item="item"/>
      </router-link>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, onActivated } from 'vue'
import { Toast } from 'vant'
import {useRouter} from 'vue-router'
import {get} from '../utils/request'
import HomeItem from '@/components/HomeItem'
import {useStore} from 'vuex'

// menu点击
const useMenuEffect = () => {
  const router = useRouter()
  const handleMenuClick = (info) => {
    console.log('info==' + info)
    Toast(info)
    router.push({ path: '/qdetail', query: { name: info }})
  }
  return { handleMenuClick }
}

const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const result = await get('/api/shop/hot-list')
    if (result?.errno === 0 && result?.data?.length) {
      console.log(result.data.concat(result.data[0]))
      nearbyList.value = result.data.concat(result.data[0])
    }
  }
  return {nearbyList, getNearbyList}
}

export default {
  name: 'Home',
  components: { HomeItem },
  setup () {
    const {handleMenuClick} = useMenuEffect()
    const {nearbyList, getNearbyList} = useNearbyListEffect()
    const store = useStore()
    onMounted(() => {
      getNearbyList()
    })
    onActivated(() => {
      // 用于测试vuex
      // store.commit('changeChanceInfo', { chanceInfo: '随机数：' + Math.random() }) // 跳过了actions，执行commit到mutations的用法
      store.dispatch('changeInfo', '随机数：' + Math.random())
    })

    const iconsList = [
      { imgName: '超市', desc: '超市便利'},
      { imgName: '菜市场', desc: '菜市场'},
      { imgName: '水果店', desc: '水果店'},
      { imgName: '鲜花', desc: '鲜花绿植'}
    ]

    console.log('nearbyList==', nearbyList.value)
    return {nearbyList, handleMenuClick, iconsList}
  }
}
</script>
<style scoped lang="scss">
  @import '../assets/scss/viriables.scss';
  .banner {
    width: 90vw;
    margin: 3vw 5vw;
    overflow: hidden;
    &__img {
      max-height: 36vw;
      width: 100%;
    }
  }
  .icons {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1vw;
    padding: 0 6vw;
    justify-content: space-between;
    &__item {
      width: 20%;
      &__img {
        display:block;
        width: 14vw;
        height: 14vw;
        margin: 0 auto;
      }
      &__desc {
        margin: 2vw 0;
        text-align: center;
        color: $content-fontcolor;
        font-size: 14px;
      }
    }
  }

  .lottery__content {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
</style>
