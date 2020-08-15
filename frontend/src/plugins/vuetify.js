import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const opts = {
  iconfont: 'mdi',
  theme: {
    themes: {
      light: {
        primary: '#335EEA',
        secondary: '#869AB8',
        tertiary: '#506690',
        accent: '#8c9eff',
        error: '#df4759',
        success: '#42ba96'
      }
    }
  }
}

export default new Vuetify(opts)
