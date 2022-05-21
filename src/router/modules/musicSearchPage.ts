import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '/musicSearchPage/:name',
		name: 'musicSearchPage',
		component: () => import('@/views/musicSearchPage/index.vue')
	}
]

export default routes