import axios from 'axios'

const instance = axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? '/' : '/', // '/api' : '/api',
  baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  timeout: 20000
})

instance.interceptors.request.use(
  config => {
    // config.headers['token'] = '63f005f3-de5f-4f88-9e1a-ee595933a93a'
    return config
  },
  err => Promise.reject(err)
)

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, {params}).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}
