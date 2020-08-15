import { HTTP } from '@/utils/request'

export default {
  createEvalationForm(data) {
    return HTTP.post('/evaluation-forms', data)
  },
  getEvalationForm(params) {
    return HTTP.get('/evaluation-forms', {
      params
    })
  }
}
