import axios from "axios";

const http = axios.create({
  //通用请求的地址前缀
  baseURL: "/api",
  //超时时间
  timeout: 10000,
});

// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
    //发送请求前要做些什么
    // const headers = config.headers;
    // // const {token = ""} = storage.getItem('userInfo') || {};
    // if(!headers.Authorization) headers.Authorization = "Bearer" +
    // 'token字符串'
    return config;
  },
  function (error) {
    // 错误请求要做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    //发送请求前要做些什么
    return response;
  },
  function (error) {
    // 错误请求要做些什么
    return Promise.reject(error);
  }
);

export default http;
