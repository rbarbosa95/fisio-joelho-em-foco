import api from '@/services/api/customerRecords'

const state = {}

const getters = {}

const actions = {
  async sendCustomeRecord({ commit }, payload) {
    return await api
      .sendCustomeRecord(payload)
      .then(res => {
        commit
        return res
      })
      .catch(error => {
        console.error(error)
      })
  },
  async getCustomeRecord({ commit }, payload) {
    return await api
      .getCustomeRecord(payload)
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
