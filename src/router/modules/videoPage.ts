import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/videoPage',
    name: 'videoPage',
    component: () => import('@/views/videoPage/index.vue')
  }
]

export default routes