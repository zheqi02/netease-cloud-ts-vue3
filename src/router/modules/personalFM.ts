import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '/personalFM',
		name: 'personalFM',
		component: () => import('@/views/personalFM/index.vue')
	}
]

export default routes
