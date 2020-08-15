export default [
  {
    path: '',
    name: 'landing',
    component: () =>
      import(/* webpackChunkName: "landing" */ '@/views/Landing.vue')
  }
]
