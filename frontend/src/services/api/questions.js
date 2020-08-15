import { HTTP } from '@/utils/request'

export default {
  sendQuestions(data) {
    return HTTP.post('/questions', data)
  },
  getQuestions(params) {
    return HTTP.get('/questions', {
      params
    })
  }
}
