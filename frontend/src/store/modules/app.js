const state = {
  isView: true,
  progress: {
    indeterminate: false,
    color: 'primary',
    value: 100
  },
  message: '',
  alert: false
}

const getters = {
  getView: state => state.isView,
  getProgressIndeterminate: state => state.progress.indeterminate,
  getProgressValue: state => state.progress.value,
  getProgressStatus: state => state.progress.color,
  getMensage: state => state.message,
  getAlert: state => state.alert
}

const actions = {}

const mutations = {
  setView(state) {
    state.isView = !state.isView
  },
  inProgress(state) {
    state.progress.indeterminate = !state.progress.indeterminate
    state.progress.value = state.progress.value === 100 ? 0 : 100
  },
  seProgressStatus(state, payload) {
    state.progress.color = payload ?? 'primary'
  },
  setMessage(state, payload) {
    state.message = payload
  },
  setAlert(state) {
    state.alert = !state.alert
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
