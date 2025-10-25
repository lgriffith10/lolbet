import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3333/api',
})

axios.interceptors.response.use(function onFulfilled(response) {
  return response.data.data
})
