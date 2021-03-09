# vue3shck

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


#### 一、Setup 函数的使用

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

#### 三、vuex的使用
