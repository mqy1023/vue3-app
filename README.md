# vue3-app

## npm安装
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
