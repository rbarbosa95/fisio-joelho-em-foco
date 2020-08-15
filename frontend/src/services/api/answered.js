import { HTTP } from '@/utils/request'

export default {
  getAnswereds(params) {
    return HTTP.get('/answereds', {
      params
    })
  },
  sendAnswereds(id, data) {
    return HTTP.put(`/answereds/${id}`, data)
  },
  createAnswereds(data) {
    return HTTP.post('/answereds', data)
  }
}
