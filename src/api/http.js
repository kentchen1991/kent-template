import axios from 'axios';

function AxiosNet(axiosConfig) {
  this.xhr = axios.create({});
  this.init = () => {
    // 请求链接，必填,String
    axiosConfig.requestUrl && (this.xhr.defaults.baseURL = axiosConfig.requestUrl);
    // 默认Content-Type为application/x-www-form-urlencoded
    this.xhr.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    const configHeaders = axiosConfig.headers || {};
    // 合并请求头配置,Object
    this.xhr.defaults.headers = Object.assign(this.xhr.defaults.headers, configHeaders);
    // 设置超时时间，默认30秒,[String,Number]
    this.xhr.defaults.timeout = axiosConfig.timeout || 30000;
    // axios请求拦截器
    this.xhr.interceptors.request.use((config) => {
      const newConfig = axiosConfig.requestInterception(config) || config;
      return newConfig;
    }, (error) => {
      console.warn('axios请求错误');
      if (axiosConfig.requestError) {
        axiosConfig.requestError();
      }
      return Promise.reject(error);
    });
    this.xhr.interceptors.response.use((response) => {
      const newConfig = axiosConfig.responseInterception(response) || response;
      return newConfig;
    }, (error) => {
      console.warn('axios响应错误');
      if (axiosConfig.responseError) {
        axiosConfig.responseError();
      }
      return Promise.reject(error);
    });
    return this.xhr;
  };
}

export default AxiosNet;
