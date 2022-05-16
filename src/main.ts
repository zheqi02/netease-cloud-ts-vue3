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
app.use(createPinia())
app.use(router)

// 在引入css重置库之前插入组件库插入meta标签
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)
app.mount('#app')
