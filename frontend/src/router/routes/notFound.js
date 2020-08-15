export default [
  {
    path: '*',
    name: 'error',
    meta: {
      requiresAuth: false
    },
    component: () => import(/* webpackChunkName: "Error" */ '@/views/Error.vue')
  }
]
