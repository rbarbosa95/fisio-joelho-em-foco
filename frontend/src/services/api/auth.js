import { HTTP } from '@/utils/request'

export default {
  singIn(data) {
    return HTTP.post('/auth/local', data)
  },
  getMe() {
    return HTTP.get('/users/me')
  },
  getUsers(params) {
    return HTTP.get('/users/', {
      params
    })
  },
  updateUser(id, data) {
    return HTTP.put(`/users/${id}`, data)
  },
  getOneUser(id) {
    return HTTP.get(`/users/${id}`)
  },
  createUsers(data) {
    return HTTP.post('/users', data)
  },
  getRoles() {
    return HTTP.get('/users-permissions/roles')
  }
}
