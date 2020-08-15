import api from '@/services/api/articles'
import router from '@/router'

const state = {
  articles: {},
  oneArticle: {
    title: '',
    preview: '',
    date: new Date(),
    sourceimage: '',
    text: '',
    user: {
      firstName: '',
      lastName: ''
    },
    likes: {
      id: '',
      heart: ''
    }
  }
}

const getters = {
  getArticles: state => state.articles,
  getOneArticle: state => state.oneArticle
}

const actions = {
  async getArticles({ commit }, payload) {
    await api
      .getArticles(payload)
      .then(res => {
        if (res.status === 200) {
          commit('setArticles', res.data)
        }
      })
      .catch(error => {
        console.error(error)
      })
  },
  async getOneArticle({ commit }, payload) {
    await api
      .getOneArticle(payload)
      .then(res => {
        if (res.status === 200) {
          commit('setOneArticle', res.data)
        }
      })
      .catch(error => {
        router.push({ name: 'artigos' })
        console.error(error)
      })
  },
  async setHeartUp({ commit, state }, payload) {
    commit('heartUps')
    await api
      .setHeartUp(payload, {
        likes: {
          id: state.oneArticle.likes.id,
          heart: state.oneArticle.likes.heart
        }
      })
      .catch(err => {
        console.error(err)
      })
  },
  async hasArticlePublic({ state }, payload) {
    return await api
      .updateArticle(payload.id, {
        public: payload.change
      })
      .then(res => {
        state
        return res
      })
      .catch(err => {
        console.error(err.response)
      })
  },
  async deleteArticle({ dispatch }, payload) {
    return await api
      .deleteArticle(payload)
      .then(res => {
        dispatch('getArticles')
        return res
      })
      .catch(err => {
        console.error(err.response)
      })
  },
  async updateArticle({ dispatch }, payload) {
    return await api
      .updateArticle(payload.id, {
        title: payload.title,
        sourceImage: payload.sourceImage,
        text: payload.text,
        slug: payload.slug,
        date: payload.date,
        preview: payload.preview,
        public: payload.public,
        user: payload.user,
        likes: {
          id: payload.likes.id,
          heart: payload.likes.heart
        }
      })
      .then(res => {
        dispatch('getArticles')
        return res
      })
      .catch(err => {
        console.error(err.response)
      })
  },
  async createArticle({ dispatch }, payload) {
    return await api
      .createArticle({
        title: payload.title,
        sourceImage: payload.sourceImage,
        text: payload.text,
        slug: payload.slug,
        date: payload.date,
        preview: payload.preview,
        public: payload.public,
        user: payload.user,
        likes: {
          heart: payload.likes.heart
        }
      })
      .then(res => {
        dispatch('getArticles')
        return res
      })
      .catch(err => {
        console.error(err.response)
      })
  }
}

const mutations = {
  setArticles(state, articles) {
    state.articles = articles
  },
  setOneArticle(state, oneArticle) {
    state.oneArticle = oneArticle
  },
  heartUps(state) {
    state.oneArticle.likes.heart++
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
