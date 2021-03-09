<template>
  <div class="flex-column-center lottery">
    <div class="flex-column-center lottery__img__content">
      <img :src="item.imgUrl" class="lottery__img">
    </div>

    <div class="lottery__content">
      <div class="lottery__content__title">{{item.name}}</div>
      <div class="over-text-show  lottery__content__tags">
        <span class="lottery__content__tag">{{item.slogan}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeItem',
  props: ['item', 'hideBorder']
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/viriables.scss';
.lottery {
  display: flex;
  width: 41vw;
  box-sizing: border-box;
  margin: 2vw 3vw 2vw 5vw;
  &__img__content {
    width: 100%;
    height: 26vw;
    border: 1px solid $content-bgColor;
  }
  &__img {
    margin-right: .16rem;
    width: 1.8rem;
  }
  &__content {
    flex: 1;
    width: 100%;
    padding-bottom: .12rem;
    &--bordered {
      border-bottom: 1px solid $content-bgColor;
    }
    &__title {
      margin-top: 0.1rem;
      line-height: 0.7rem;
      font-size: $font-size-16;
      color: $content-fontcolor;
    }
    &__tags {
      font-size: $font-size-12;
      color: $main-color;
    }
    &__tag {
      margin-right: .16rem;
    }
  }
}
</style>
