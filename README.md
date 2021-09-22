# vue3-app

### npm安装
```
npm install
```

### 在线使用
```
npm run serve
```

### 生产环境打包
```
npm run build
```

#### 二、页面适配
[vue3.0中使用postcss-pxtorem](https://www.jianshu.com/p/8350b611e5bb)


#### 三、keep-alive缓存页面

```javascript
// Home,News  对应路由中要缓存的component名字
<router-view v-slot="{ Component }">
  <keep-alive include="Home,News">
    <component :is="Component" />
  </keep-alive>
</router-view>
```

#### 三、Vue-Router 路由

#### 四、vuex的使用

`vuex` 数据管理框架， `createStore` 创建了一个全局的唯一的仓库用于存放全局数据

* 1、派发一个action `dispatch -> actions` 
* 2、`actions`中提交commit触发对应mutation `commit -> mutations`
* 3、`mutations` 中改变 `state`
```javascript

export default createStore({
  state: {
    chanceInfo: 'init value'
  },
  mutations: {
    changeChanceInfo (state, payload) {
      const { chanceInfo } = payload
      state.chanceInfo = chanceInfo
    }
  },
  // actions(执行异步) 为了解决mutations只有同步的问题
  actions: { // 提交commit 触发mutation
    changeInfo ({commit, state}, infos) {
      const preInfos = state.chanceInfo
      console.log('preInfos=', preInfos)
      commit('changeChanceInfo', { chanceInfo: infos })
    }
  },
  modules: {
  }
})

// 组件中使用
export default {
  setup () {
    const store = useStore()

    // 用于测试store
    Toast(store.state.chanceInfo)
  
    const changeStoreInfo = () => { // 调用store的改变方法
      // store.commit('changeChanceInfo', { chanceInfo: '随机数：' + Math.random() }) // 跳过了actions，执行commit到mutations的用法
      store.dispatch('changeInfo', '随机数：' + Math.random())    }
    return {  }
  }
}
```

## Vue 3.0 Composition API 基本特性体验

### 1、生命周期函数的新写法

`setup()` 函数是 vue3 中专门为组件提供的新属性，相当于 2.x 版本中的`created`函数,之前版本的组件逻辑选项，现在都统一放在这个函数中处理。它为我们使用 vue3 的 `Composition API` 新特性提供了统一的入口,**setup** 函数会在相对于 2.x 来说，会在 **beforeCreate** 之后、**created** 之前执行！具体可以参考如下：

|      vue2.x      |      vue3       |
| :--------------: | :-------------: |
| ~~beforeCreate~~ |   setup(替代)   |
|   ~~created~~    |   setup(替代)   |
|   beforeMount    |  onBeforeMount  |
|     mounted      |    onMounted    |
|   beforeUpdate   | onBeforeUpdate  |
|     updated      |    onUpdated    |
|  beforeDestroy   | onBeforeUnmount |
|    destroyed     |   onUnmounted   |
|  errorCaptured   | onErrorCaptured |
|  renderTracked   | onRenderTracked |
|  renderTriggered   | onRenderTriggered |


```javascript
// created 实例被完全初始化之前
setup() { 
  onMounted(async () => {
    // 执行 await
  })
  // mounted
  //onMounted(() => {
  //})
}
```

>>在 setup() 内部，this 不会是该活跃实例的引用，因为 setup() 是在解析其它组件选项之前被调用的，所以 setup() 内部的 this 的行为与其它选项中的 this 完全不同。这在和其它选项式 API 一起使用 setup() 时可能会导致混淆。

### 2、ref 响应式引用的用法

`ref()` 一般存放的是基本类型数据, 用来根据给定的值创建一个**响应式**的**数据对象**，`ref()` 函数调用的返回值是一个被包装后的对象（RefImpl），这个对象上只有一个 `.value` 属性，如果我们在`setup`函数中，想要访问的对象的值，可以通过`.value`来获取，但是如果是在`<template>`**模板中**，直接访问即可，不需要`.value`！

> 用于替代原来的data() { return { .... } } 的写法

```javascript

<template>
  <p>活动状态：{{active}}</p>
  <p>活动时间：{{timeData}}</p>
  <p>书本：{{ book.title }}</p>
</template>
<script>
  import { ref, reactive } from 'vue'

  export default {
    setup() {
        const active = ref("");
        const timeData = ref(36000000);

        const book = reactive({ title: 'Vue 3 Guide' })
        
        console.log('输出===>',timeData.value)
        setTimeout(() => {
            timeData.value = 720000
        })
        return {
           active,
           timeData,
           book
        }
    }
  }
```

### 3、reactive 响应式引用的用法

`reactive()` 函数接收一个普通对象，返回一个响应式的数据对象，等价于 `vue 2.x` 中的 `Vue.observable()` 函数，`vue 3.x` 中提供了 `reactive()` 函数，用来创建响应式的数据对象`Observer`，`ref`中我们一般存放的是**基本类型数据**，如果是引用类型的我们可以使用`reactive`函数。

当`reactive`函数中，接收的类型是一个`Array`数组的时候，我们可以在这个`Array`外面在用对象包裹一层，然后给对象添加一个属性比如：`value`（这个属性名你可以自己随便叫什么），他的值就是这个数组！

```javascript
<script>
// 使用相关aip之前必须先引入
import { ref, reactive } from 'vue'
export default {
  setup(props, { attrs, slots, parent, root, emit, refs }) {


    // 将tabImgs数组中每个对象都变成响应式的对象
    const tabImgs = reactive({
      value: []
    });
    const ball = reactive({
      show: false,
      el: ""
    });
    return {
      tabImgs,
      ...toRefs(ball),
    };
  }
};
</script>
```

那么在`template`模板中我们想要访问这个数组的时候就是需要使用`.value`的形式来获取这个数组的值。

```html
<template>
  <div class="swiper-cls">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(img ,index) in tabImgs.value" :key="index">
        <img
          class="slide_img"
          @click="handleClick(img.linkUrl)"
          :src="img.imgUrl"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>
```

### 4、toRefs 响应式引用的用法

`toRefs`函数会将**响应式reactive对象**转换成多个**ref响应数据对象**，其中返回的对象上的每个属性都是指向原始对象中相应属性的`ref`，将一个对象上的所有属性转换成响应式的时候，将会非常有用！


```javascript
import { reactive, toRefs } from 'vue'

const book = reactive({
  author: 'Vue Team',
  year: '2020',
  title: 'Vue 3 Guide',
  description: 'You are reading this book right now ;)',
  price: 'free'
})
// let { author, title } = book 使用解构的两个 property 的响应性都会丢失。对于这种情况，我们需要将我们的响应式对象转换为一组 ref

let { author, title } = toRefs(book)

title.value = 'Vue 3 Detailed Guide' // 我们需要使用 .value 作为标题，现在是 ref
console.log(book.title) // 'Vue 3 Detailed Guide'
```

### 5、computed方法生成计算属性

`computed`函数的第一个参数，可以接收一个函数，或者是一个对象！如果是函数默认是`getter`函数，并为`getter`返回的值返回一个只读的`ref`对象。

```javascript
import { computed } from 'vue'

const count = ref(1)
// computed接收一个函数作为入参
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value); // 2

plusOne.value++; // 错误，plusOne是只读的！
```

或者也可以是个对象，可以使用具有`get`和`set`功能的对象来创建可写`ref`对象。

```javascript
const count = ref(1);
// computed接收一个对象作为入参
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1;
  },
});

plusOne.value = 1;  // 调用  set 将count 为 1 - 1 = 0
console.log(count.value); // 0  ，plusOne.value 为 1
```

### 5、watch 和 watchEffect 的使用和差异性

```javascript
// 侦听一个 getter
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)

// 直接侦听ref
const count = ref(0)
watch(count, (count, prevCount) => {
  /* ... */
})

// 侦听多个数据源
const firstName = ref('');
const lastName = ref('');

watch([firstName, lastName], (newValues, prevValues) => {
  console.log(newValues, prevValues);
})

firstName.value = "John"; // logs: ["John",""] ["", ""]
lastName.value = "Smith"; // logs: ["John", "Smith"] ["John", ""]

// 侦听响应式对象
const numbers = reactive([1, 2, 3, 4])

watch(
  () => [...numbers],
  (numbers, prevNumbers) => {
    console.log(numbers, prevNumbers);
  })

numbers.push(5) // logs: [1,2,3,4,5] [1,2,3,4]
```
watchEffect 方法。它立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。

* 立即执行
* 不需要传入要侦听的内容，自动感知代码依赖（代码块中的proxy数据）
* 不能获取之前数据的值
```javascript
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> logs 0

setTimeout(() => {
  count.value++
  // -> logs 1
}, 100)
```

### 6、provide, inject
父组件有一个 provide 选项来提供数据，子组件有一个 inject 可以突破prop 逐级传递在很多层次时繁琐的问题

为了增加 provide 值和 inject 值之间的响应性，我们可以在 provide 值时使用 ref 或 reactive。

```javascript
<!-- src/components/MyMap.vue -->
<template>
  <MyMarker />
</template>

<script>
import { provide, reactive, ref } from 'vue'
import MyMarker from './MyMarker.vue

export default {
  components: {
    MyMarker
  },
  setup() {
    const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })

    provide('location', location)
    provide('geolocation', geolocation)
  }
}
</script>


<!-- src/components/MyMarker.vue -->
export default {
  inject: ['location', 'geolocation']
}
</script>
```

修改响应式 property

```javascript
<!-- src/components/MyMap.vue -->
<template>
  <MyMarker />
</template>

<script>
import { provide, reactive, ref } from 'vue'
import MyMarker from './MyMarker.vue

export default {
  components: {
    MyMarker
  },
  setup() {
    const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })

    const updateLocation = () => {
      location.value = 'South Pole'
    }

    provide('location', location)
    provide('geolocation', geolocation)
    provide('updateLocation', updateLocation)
  }
}
</script>


<!-- src/components/MyMarker.vue -->
import { inject } from 'vue'

export default {
  setup() {
    const userLocation = inject('location', 'The Universe')
    const userGeolocation = inject('geolocation')
    const updateUserLocation = inject('updateLocation')
    
    // 调用 updateUserLocation() 来修改

    return {
      userLocation,
      userGeolocation,
      updateUserLocation
    }
  }
}
</script>
```

最后，如果要确保通过 provide 传递的数据不会被 inject 的组件更改，我们建议对提供者的 property 使用 readonly。

### 7、使用ref获取真实dom

* 1、使用ref函数传入null，创建ref对象
* 2、模板中通过定义ref属性 等于1中创建的ref对象名称建立关联
* 3、使用

```javascript

<button ref="hello">hello world</button>

setup() {
  const { ref, onMouted } = Vue
  const hello = ref(null)
  onMouted(() => {
    console.log(hello.value)
  })
  return { hello }
}
```


## 项目基础解析

### 一、基础样式集成

* 1、normalize.css  // 不同的浏览器在渲染网页元素的时候形式更统一
* 2、基础样式在 `asset/scss` 中
```css
@import './base.scss'; // 基础部分
@import './iconfont.css'; // 字体样式
@import './viriables.scss'; // 变量
```
* 3、iconfont 阿里巴巴素材网的字体图标
* 4、mixins的使用
* 5、`scoped` 显示css样式只作用于组件内部

```css
@mixin ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

// 使用
@include ellipsis;
```

### 二、路由

* 1、路由拆分
* 2、路由守卫实现基础登陆校验功能

### 三、axios网络请求
