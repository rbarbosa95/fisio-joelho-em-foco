import api from '@/services/api/moodScale'

const state = {}

const getters = {}

const actions = {
  async sendMoodScale({ commit }, payload) {
    return await api
      .sendMoodScale(payload)
      .then(res => {
        commit
        return res
      })
      .catch(error => {
        console.error(error)
      })
  },
  async getMoodScale({ commit }, payload) {
    return await api
      .getMoodScale(payload)
      .then(res => {
        commit
        return res
      })
      .catch(error => {
        console.error(error)
      })
  }
}

const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
