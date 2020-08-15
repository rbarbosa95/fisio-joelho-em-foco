import api from '@/services/api/videos'

const state = {
  listVideos: []
}

const getters = {
  getListVideos: state => state.listVideos
}

const actions = {
  async getVideos({ commit }, payload) {
    await api
      .getVideos(payload)
      .then(res => {
        if (res.status === 200) {
          commit('setListVideos', res.data)
        }
      })
      .catch(error => {
        console.error(error)
      })
  },
  async hasVideoPublic({ state }, payload) {
    return await api
      .updateVideos(payload.id, {
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
  async updateVideos({ dispatch }, payload) {
    return await api
      .updateVideos(payload.id, {
        title: payload.title,
        youtubeUrl: payload.youtubeUrl,
        public: payload.public
      })
      .then(res => {
        dispatch('getVideos')
        return res
      })
      .catch(err => {
        console.error(err.response)
      })
  },
  async deleteVideo({ dispatch }, payload) {
    return await api
      .deleteVideo(payload)
      .then(res => {
        dispatch('getVideos')
        return res
      })
      .catch(err => {
        console.error(err.response)
      })
  },
  async createVideo({ commit }, payload) {
    return await api
      .createVideo(payload)
      .then(res => {
        commit
        return res
      })
      .catch(err => {
        console.error(err.response)
      })
  }
}

const mutations = {
  setListVideos(state, videos) {
    state.listVideos = videos
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
