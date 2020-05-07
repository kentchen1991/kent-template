import AxiosNet from "./http";
import qs from "qs";

const xhr = new AxiosNet({
  requestInterception(config) { // 请求拦截
    console.log(config, '请求拦截');
    if (config.method === 'post' || config.method === "put") { // 防止缓存
      config.data = {
        ...config.data,
        t: Date.parse(new Date()) / 1000
      }
    } else if (config.method === 'get' || config.method === "delete") {
      config.params = {
        t: Date.parse(new Date()) / 1000,
        ...config.params
      }
    }
    config.data = qs.stringify(config.data)
    return config;
  },
  responseInterception(response) { // 响应拦截
    return response.data;
  }
}).init();

const net = {
  get: (url, params = {}) => xhr.get(url, { params }),
  post: (url, params = {}) => xhr.post(url, params),
  put: (url, params = {}) => xhr.put(url, params),
  delete: (url, params = {}) => xhr.delete(url, { params }),
}


//登录
export const apiLogin = p => net.post('/api/login', p);


