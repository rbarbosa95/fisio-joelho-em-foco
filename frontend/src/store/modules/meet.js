import api from '@/services/api/meet'

const state = {}

const getters = {}

const actions = {
  async sendMeet({ commit }, payload) {
    return await api
      .sendMeet(payload)
      .then(res => {
        commit
        return res
      })
      .catch(error => {
        console.error(error)
      })
  },
  async getOneMeet({ commit }, payload) {
    return await api
      .getOneMeet(payload)
      .then(res => {
        commit
        return res
      })
      .catch(error => {
        console.error(error)
        return error.response
      })
  },
  async updateMeet({ commit }, payload) {
    return await api
      .updateMeet(payload.id, {
        link: payload.link,
        date: payload.date,
        user: payload.user
      })
      .then(res => {
        commit
        return res
      })
      .catch(error => {
        console.error(error)
        return error.response
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
