<template>
  <div class="wrapper">
    <van-nav-bar
            title="父子组件"
            :z-index="9999"
            :border="true"
            :fixed="true"
    />
    <van-tabs v-model:active="active" sticky offset-top="42" @change="onClickTab">
      <van-tab v-for="(tab, index)  in tabList"
               :title="tab.name"
               :key="index">
        <div class="list__wrapper" v-if="detailList.length>0">
          <div v-for="item in detailList"
               :key="item.item_id">
            <MineItem :item="item" @getPrize="getPrize" />
          </div>
        </div>
        <div v-else style="padding-top: 20vh">
          空列表
        </div>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import { Toast } from 'vant'
// import { useRoute } from 'vue-router'
import MineItem from '@/components/MineItem'
import { get } from '../utils/request'

const useListEffect = () => {
  const data = reactive({ detailList: {} })
  const getListData = async (status) => {
    Toast(status)
    const result = await get('/api/shop/hot-list')
    if (result?.errno === 0 && result?.data?.length) {
      detailList.value = result.data.concat(result.data[0])
    }
  }
  const { detailList } = toRefs(data)
  return { detailList, getListData }
}

export default {
  name: 'Mime',
  components: { MineItem },
  setup () {
    const active = ref(0)
    const tabList = reactive([
      { name: '待开始', status: 1 }, { name: '进行中', status: 0 }, { name: '已结束', status: 2 }
    ])
    const { detailList, getListData } = useListEffect()
    const onClickTab = (index) => {
      console.log('index==' + index)
      active.value = index
      getListData(index)
    }
    const getPrize = (detail) => {
      console.log(detail.name)
      Toast(detail.name + detail.slogan)
    }

    getListData(active.value)
    return { active, tabList, detailList, onClickTab, getPrize, getListData }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/viriables.scss';
  .wrapper {
    height: 100vh;
  }
  .list__wrapper {
  }
</style>
