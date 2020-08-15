import api from '@/services/api/questions'

const state = {}

const getters = {}

const actions = {
  async sendQuestions({ commit }, payload) {
    return await api
      .sendQuestions(payload)
      .then(res => {
        commit
        return res
      })
      .catch(error => {
        console.error(error)
      })
  },
  async getQuestions({ commit }, payload) {
    return await api
      .getQuestions(payload)
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
