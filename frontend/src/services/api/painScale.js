import { HTTP } from '@/utils/request'

export default {
  sendPainScale(data) {
    return HTTP.post('/pain-scales', data)
  },
  getPainScale(params) {
    return HTTP.get('/pain-scales', {
      params
    })
  }
}
