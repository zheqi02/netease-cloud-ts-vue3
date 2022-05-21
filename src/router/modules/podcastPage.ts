import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/podcast',
    name: 'podcast',
    component: () => import('@/views/podcast/index.vue'),
  }
]

export default routes