import api from '@/services/api/evaluationForms'

const state = {}

const getters = {}

const actions = {
  async createEvalationForm({ commit }, payload) {
    return await api
      .createEvalationForm(payload)
      .then(res => {
        commit
        return res
      })
      .catch(error => {
        console.error(error)
      })
  },
  async getEvalationForm({ commit }, payload) {
    return await api
      .getEvalationForm(payload)
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
