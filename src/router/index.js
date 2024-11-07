import { createWebHistory, createRouter } from 'vue-router'
import routes from '@/router/routes'

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title){
    document.title = to.meta.title
  }
  next()
})

export default router