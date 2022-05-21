import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/livePage',
    name: 'livePage',
    component: () => import('@/views/livePage/index.vue')
  }
]

export default routes