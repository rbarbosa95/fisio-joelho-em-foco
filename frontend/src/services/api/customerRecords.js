import { HTTP } from '@/utils/request'

export default {
  sendCustomeRecord(data) {
    return HTTP.post('/customer-records', data)
  },
  getCustomeRecord(params) {
    return HTTP.get('/customer-records', {
      params
    })
  }
}
