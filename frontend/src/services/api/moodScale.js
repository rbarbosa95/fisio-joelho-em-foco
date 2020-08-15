import { HTTP } from '@/utils/request'

export default {
  sendMoodScale(data) {
    return HTTP.post('/mood-scales', data)
  },
  getMoodScale(params) {
    return HTTP.get('/mood-scales', {
      params
    })
  }
}
