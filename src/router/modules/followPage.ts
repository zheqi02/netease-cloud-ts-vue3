import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/followPage',
    name: 'followPage',
    component: () => import('@/views/followPage/index.vue')
  }
]

export default routes
