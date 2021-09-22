<template>
  <div class="content">
    <div class="category">
      <div
        :class="{'category__item': true, 'category__item--active': currentTab === item.tab}"
        v-for="item in categories"
        :key="item.name"
        @click="() => handleTabClick(item.tab)"
      >
        {{item.name}}
      </div>
    </div>
    <div class="product">
      <div
        class="product__item"
        v-for="item in list"
        :key="item._id"
      >
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__sales">月售 {{item.sales}} 件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{item.price}}
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus">-</span>
          0
          <span class="product__number__plus">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { get } from '../../utils/request'

const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit'}
]

// Tab 切换相关的逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick}
}

// 列表内容相关的逻辑
const useCurrentListEffect = (currentTab) => {
  const route = useRoute()
  const shopId = route.params.id || 1
  const content = reactive({ list: [] })

  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    })
    if (result?.errno === 0 && result?.data?.length) {
      content.list = result.data
    }
  }

  watchEffect(() => { getContentData() })

  const { list } = toRefs(content)
  return { list }
}

export default {
  name: 'Cate',
  setup () {
    const { currentTab, handleTabClick } = useTabEffect()
    const { list } = useCurrentListEffect(currentTab)
    return { categories, currentTab, handleTabClick, list}
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/viriables';
@import '../../assets/scss/mixins';
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 1rem;
}
.category {
  overflow-y: scroll;
  height: 100%;
  width: 2.16rem;
  background: $search-bgColor;
  &__item {
    line-height: 1.1rem;
    text-align: center;
    font-size: 14px;
    color: #333;
    &--active {
      background: $bgColor;
    }
  }
}
.product {
  overflow-y: scroll;
  flex: 1;
  &__item {
    position: relative;
    display: flex;
    padding: .32rem 0;
    margin: 0 .36rem;
    border-bottom: .01rem solid $content-bgColor;
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: 1.28rem;
      height: 1.28rem;
      margin-right: .36rem;
    }
    &__title {
      margin: 0;
      line-height: .5rem;
      font-size: .34rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__sales {
      margin: .06rem 0;
      font-size: .32rem;
      color: $content-fontcolor;
    }
    &__price {
      margin: 0;
      line-height: .2rem;
      font-size: .34rem;
      color: $hightlight-fontColor;
    }
    &__yen {
      font-size: .32rem;
    }
    &__origin {
      margin-left: .16rem;
      line-height: .5rem;
      font-size: .32rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: .32rem;
      font-size: .43rem;
      &__minus, &__plus
       {
        display: inline-block;
        width: .5rem;
        height: .5rem;
        line-height: .4rem;
        border-radius: 50%;
        text-align: center;
      }
      &__minus {
        border: .01rem solid $medium-fontColor;
        color: $medium-fontColor;
        margin-right: .15rem;
      }
      &__plus {
        background: $btn-bgColor;
        color: $bgColor;
        margin-left: .15rem;
      }
    }
  }

}
</style>
