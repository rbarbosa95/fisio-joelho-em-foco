export default [
  {
    path: '/videos',
    name: 'videos',
    component: () =>
      import(/* webpackChunkName: "Videos" */ '@/views/Videos.vue')
  }
]
