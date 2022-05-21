import { createApp } from 'vue'
import App from './App.vue'
// 引入unocss
import 'uno.css'
// 引入css重置库
import '@unocss/reset/tailwind.css'
// 引入路由和状态管理
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)
// 这里放注册插件
app.use(createPinia()).use(router)

app.mount('#app')
