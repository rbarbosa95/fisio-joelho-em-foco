export default [
  {
    path: '/artigos',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "artigo" */ '@/views/articles/Articles.vue'),
    children: [
      {
        path: '',
        name: 'artigos',
        component: () =>
          import(
            /* webpackChunkName: "artigo" */ '@/views/articles/ArticlesList.vue'
          )
      },
      {
        path: '/artigos/:id',
        component: () =>
          import(
            /* webpackChunkName: "artigo" */ '@/views/articles/ArticlePost.vue'
          )
      }
    ]
  }
]
