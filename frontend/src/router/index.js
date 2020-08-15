import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'
import storage from '@/utils/localStorage'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...routes]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isTokenSet = storage.getToken('customer')
  if (requiresAuth && !isTokenSet) {
    return next('/')
  }
  return next()
})

export default router
