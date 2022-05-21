import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'homePage',
    component: () => import('@/views/homePage/HomePage.vue')
  }
]

export default routes
