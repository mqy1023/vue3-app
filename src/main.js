import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import 'normalize.css'
import './assets/scss/index.scss'
import { NavBar, Tab, Tabs, List, Cell } from 'vant'

const app = createApp(App)
app.use(NavBar).use(Tab).use(Tabs).use(List).use(Cell)
app.use(store).use(router).mount('#app')
