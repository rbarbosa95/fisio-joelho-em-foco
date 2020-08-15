import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import VueYouTubeEmbed from 'vue-youtube-embed'
import '@/plugins/markdown'
import '@/plugins/moment'

Vue.config.productionTip = false
Vue.use(VueYouTubeEmbed)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
