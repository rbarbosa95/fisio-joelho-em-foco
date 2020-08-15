import { HTTP } from '@/utils/request'
import storage from '@/utils/localStorage'

export default {
  getVideos(params) {
    delete HTTP.defaults.headers.Authorization
    return HTTP.get('/videos', {
      params
    })
  },
  updateVideos(id, data) {
    HTTP.defaults.headers.Authorization = `Bearer ${storage.getToken(
      'customer'
    )}`
    return HTTP.put(`/videos/${id}`, data)
  },
  deleteVideo(id) {
    HTTP.defaults.headers.Authorization = `Bearer ${storage.getToken(
      'customer'
    )}`
    return HTTP.delete(`/videos/${id}`)
  },
  createVideo(data) {
    HTTP.defaults.headers.Authorization = `Bearer ${storage.getToken(
      'customer'
    )}`
    return HTTP.post('/videos', data)
  }
}
