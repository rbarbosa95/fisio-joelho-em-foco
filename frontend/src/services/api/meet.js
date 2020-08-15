import { HTTP } from '@/utils/request'

export default {
  sendMeet(data) {
    return HTTP.post('/google-meets', data)
  },
  getOneMeet(id) {
    return HTTP.get(`/google-meets/${id}`)
  },
  updateMeet(id, data) {
    return HTTP.put(`/google-meets/${id}`, data)
  }
}
