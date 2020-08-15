import api from '@/services/api/painScale'

const state = {}

const getters = {}

const actions = {
  async sendPainScale({ commit }, payload) {
    return await api
      .sendPainScale(payload)
      .then(res => {
        commit
        return res
      })
      .catch(error => {
        console.error(error)
      })
  },
  async getPainScale({ commit }, payload) {
    return await api
      .getPainScale(payload)
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
