import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../views/home/index.vue'

const routes = [
  { path: '/', component: HomeView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router