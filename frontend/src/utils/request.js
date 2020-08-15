import axios from 'axios'
import storage from '@/utils/localStorage'

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  timeout: 1000
})

HTTP.interceptors.request.use(
  config => {
    delete HTTP.defaults.headers.Authorization
    const urlsExcludedForBearerHeader = ['articles', 'videos', 'auth']
    const url = config.url.split('/')
    if (!urlsExcludedForBearerHeader.includes(url[1])) {
      const TOKEN = storage.getToken('customer')
      config.headers.Authorization = `Bearer ${TOKEN}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

HTTP.interceptors.response.use(
  res => {
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

export { HTTP }
