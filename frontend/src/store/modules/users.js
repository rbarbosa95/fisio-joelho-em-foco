import api from '@/services/api/auth'

const state = {
  users: []
}

const getters = {
  getUsers(state) {
    return state.users.map(mapper => {
      return {
        id: mapper.id,
        firstName: mapper.firstName,
        completeName: mapper.firstName + ' ' + mapper.lastName
      }
    })
  }
}

const actions = {
  async getUsers({ commit }, payload) {
    await api
      .getUsers(payload)
      .then(res => {
        commit('setUsers', res.data)
      })
      .catch(error => {
        console.error(error)
      })
  },
  async updateUsers({ commit }, payload) {
    return await api
      .updateUser(payload.id, {
        firstName: payload.firstName,
        lastName: payload.lastName,
        age: payload.age,
        sexo: payload.sexo,
        profession: payload.profession
      })
      .then(res => {
        commit
        return res
      })
      .catch(error => {
        console.error(error)
        return error.response
      })
  },
  async getOneUser({ commit }, payload) {
    return await api
      .getOneUser(payload)
      .then(res => {
        commit
        return res.data
      })
      .catch(error => {
        console.error(error)
        return error
      })
  }
}

const mutations = {
  setUsers(state, payload) {
    state.users = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
