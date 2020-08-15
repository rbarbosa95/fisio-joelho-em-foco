const { stringify, parse } = JSON

export default {
  set(key, value, { format } = {}) {
    localStorage.setItem(key, !format ? stringify(value) : value)
  },
  get(key, { format } = {}) {
    const value = localStorage.getItem(key)
    return format ? parse(window.localStorage.getItem(key)) : value
  },
  remove: key => localStorage.removeItem(key),
  getToken(key) {
    let storage = this.get(key, {
      format: true
    })
    return storage?.jwt
  },
  getUser(key) {
    let storage = this.get(key, {
      format: true
    })
    return storage?.user
  }
}
