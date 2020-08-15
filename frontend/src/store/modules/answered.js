import api from '@/services/api/answered'

const state = {
  formFisio: {}
}

const getters = {}

const actions = {
  async getAnswered({ commit }, payload) {
    return await api
      .getAnswereds(payload)
      .then(res => {
        commit
        return res
      })
      .catch(error => {
        console.error(error)
      })
  },
  async sendAnswereds({ commit }, payload) {
    return await api
      .sendAnswereds(payload.id, {
        infosBasic: payload?.infosBasic,
        evaluationForm: payload?.evaluationForm,
        questions: payload?.questions
      })
      .then(res => {
        commit
        return res
      })
      .catch(error => {
        console.error(error)
      })
  },
  async createAnswereds({ commit }, payload) {
    return await api
      .createAnswereds(payload)
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
