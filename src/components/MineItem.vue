<template>
  <div class="flex-row-center lottery">
    <img :src="item.imgUrl" class="lottery__img">
    <div class="lottery__content">
      <div class="lottery__content__title">{{item.name}}</div>
      <div class="lottery__content__tags">您已参与：{{item.slogan}}次</div>
    </div>
    <div class="lottery__btn" @click="getPrize">点击子组件</div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'MineItem',
  props: ['item', 'hideBorder'],
  emits: ['getPrize'],
  setup (props, ctx) {
    const itemDetail = ref(props.item)
    const getPrize = () => {
      ctx.emit('getPrize', itemDetail.value)
    }
    return { getPrize }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/viriables.scss';
.lottery {
  display: flex;
  position: relative;
  width: 90vw;
  box-sizing: border-box;
  margin: 4vw 5vw;
  padding: 4vw;
  background: #FFFFFF;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  &__img {
    width: 16vw;
    margin-right: .36rem;
  }
  &__content {
    flex: 1;
    width: 100%;
    padding-bottom: .14rem;
    &--bordered {
      border-bottom: 1px solid $content-bgColor;
    }
    &__title {
      font-size: $font-size-18;
      margin-bottom: 2vw;
      color: $content-fontcolor;
    }
    &__tags {
      font-size: $font-size-12;
      color: #999999;
    }
  }
  &__btn {
    color: #E93F3F;
    padding: 1.4vw 3vw;
    border-radius: 14px;
    font-size: 14px;
    border: 1px solid #E93F3F;
  }
  &__btn1 {
    color: #999999;
    padding: 1.4vw 3vw;
    border-radius: 14px;
    font-size: 14px;
    border: 1px solid #999999;
  }
}
</style>
