import axios from 'axios'
import { Notice } from 'iview'
import {getStorage,setStorage} from './auth'
// 创建axios实例
const service = axios.create({
  baseURL: '/api/', // api 的 base_url
  timeout: 10000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // config.headers['Authorization'] = getCookies('salaryuser')?'Bearer '+ JSON.parse(getCookies('salaryuser')).access_token:''
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    // return response.data
    if (res.code != 0) {
      Notice.error({
        title: '错误提示',
        desc: res.message
      })
      if(res.code == 20006){
        setTimeout(()=>{
          sessionStorage.clear()
        },800)
      }
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    Notice.error({
      title: '错误提示',
      desc: '有错误'
    })
    return Promise.reject(error)
  }
)

export default service
