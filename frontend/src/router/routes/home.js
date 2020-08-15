export default [
  {
    path: '/home/',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/home/Home.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/Account.vue')
      },
      {
        path: 'sentings',
        name: 'sentings',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/Sentings.vue')
      },
      {
        path: 'users',
        name: 'users',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/Users.vue')
      },
      {
        path: 'articles',
        name: 'articles',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/HomeArticles.vue')
      },
      {
        path: 'media',
        name: 'media',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/HomeVideos.vue')
      },
      {
        path: 'meet',
        name: 'meet',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/Meet.vue')
      },
      {
        path: 'questions',
        name: 'questions',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/Questions.vue')
      },
      {
        path: 'painscale',
        name: 'painscale',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/PainScale.vue')
      },
      {
        path: 'moodscale',
        name: 'moodscale',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/MoodScale.vue')
      },
      {
        path: 'customer',
        name: 'customer',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/Customer.vue')
      },
      {
        path: 'meetfisio',
        name: 'meetfisio',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/MeetFisio.vue')
      }
    ]
  }
]
