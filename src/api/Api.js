import axios from 'axios'
const url = ''

const $http = axios.create({
  baseURL: url, // 所有的请求地址前缀部分
  timeout: 60000, // 请求超时时间毫秒
  withCredentials: true, // 异步请求携带cookie
  headers: {
    // 设置后端需要的传参类型
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
$http.interceptors.request.use(
  (config) => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 添加响应拦截器
$http.interceptors.response.use(
  (response) => {
    // 关闭加载进度
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
const apiGet = async (url, params) => {
  const res = await $http.get(url, { params })
  return res.data.RECORDS
}
const apiPost = async (url, params) => {
  const res = await $http.post(url, { params })
  return res.data
}
export default apiGet
export { apiGet, apiPost }
