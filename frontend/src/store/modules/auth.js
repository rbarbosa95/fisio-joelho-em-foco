import api from '@/services/api/auth'
import storage from '@/utils/localStorage'
import router from '@/router'

const state = {
  user: storage.getUser('customer') || null,
  token: storage.getToken('customer') || null,
  isTokenSet: !!storage.getToken('customer')
}

const getters = {
  geToken(state) {
    return {
      token: state.token,
      isTokenSet: state.isTokenSet
    }
  },
  getuser: state => state.user
}

const actions = {
  async singIn({ commit }, payload) {
    return await api
      .singIn(payload)
      .then(res => {
        commit('setToken', {
          token: res.data.jwt,
          isTokenSet: true
        })
        commit('setUser', res.data.user)
        storage.set('customer', res.data)
        if (res.status === 200) {
          router.push({ name: 'home' })
        }
        return res
      })
      .catch(error => {
        return error.response
      })
  },
  async profile({ commit, state }) {
    return await api
      .getMe(state.token)
      .then(res => {
        commit('setUser', res.data)
        return res.data
      })
      .catch(error => {
        console.error(error.response)
      })
  },
  logout({ commit }) {
    commit('setToken', {
      token: null,
      isTokenSet: false
    })
    commit('setUser', null)
    storage.remove('customer')
    router.push({ name: 'landing' })
  },
  async getUsers({ commit }, payload) {
    return await api
      .getUsers(payload)
      .then(res => {
        commit
        return res
      })
      .catch(error => {
        console.error(error)
        return error
      })
  },
  async hasUserBlocked({ state }, payload) {
    return await api
      .updateUser(payload.id, {
        blocked: payload.change
      })
      .then(res => {
        state
        return res
      })
      .catch(err => {
        console.error(err.response)
      })
  },
  async updateUser({ state }, payload) {
    return await api
      .updateUser(payload.id, {
        username: payload.username,
        password: payload.password,
        email: payload.email,
        role: payload.role?.id,
        lastName: payload.lastName,
        firstName: payload.firstName,
        blocked: payload.blocked,
        confirmed: payload.confirmed
      })
      .then(res => {
        state
        return res
      })
      .catch(err => {
        console.error(err.response)
      })
  },
  async createUsers({ dispatch }, payload) {
    return await api
      .createUsers(payload)
      .then(res => {
        dispatch('getUsers')
        return res
      })
      .catch(err => {
        console.error(err.response)
      })
  },
  async getRoles({ commit }) {
    return await api
      .getRoles()
      .then(res => {
        commit
        return res
      })
      .catch(error => {
        console.error(error)
        return error
      })
  }
}

const mutations = {
  setToken(state, payload) {
    state.token = payload.token
    state.isTokenSet = payload.isTokenSet ?? false
  },
  setUser(state, payload) {
    state.user = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
