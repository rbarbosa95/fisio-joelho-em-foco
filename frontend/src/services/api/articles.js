import { HTTP } from '@/utils/request'
import storage from '@/utils/localStorage'

export default {
  getArticles(params) {
    delete HTTP.defaults.headers.Authorization
    return HTTP.get('/articles', {
      params
    })
  },
  getOneArticle(id) {
    delete HTTP.defaults.headers.Authorization
    return HTTP.get(`/articles/${id}`)
  },
  setHeartUp(id, data) {
    delete HTTP.defaults.headers.Authorization
    return HTTP.put(`/articles/${id}`, data)
  },
  updateArticle(id, data) {
    HTTP.defaults.headers.Authorization = `Bearer ${storage.getToken(
      'customer'
    )}`
    return HTTP.put(`/articles/${id}`, data)
  },
  deleteArticle(id) {
    HTTP.defaults.headers.Authorization = `Bearer ${storage.getToken(
      'customer'
    )}`
    return HTTP.delete(`/articles/${id}`)
  },
  createArticle(data) {
    HTTP.defaults.headers.Authorization = `Bearer ${storage.getToken(
      'customer'
    )}`
    return HTTP.post('/articles', data)
  }
}
