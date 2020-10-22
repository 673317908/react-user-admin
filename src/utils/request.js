import { message } from "antd";
import axios from "axios"
import { getInfo } from "./storage"
const service = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 1000
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (getInfo("user_name")) {
        config.headers["Token"] = getInfo("user_token")
        config.headers["Username"] = getInfo("user_name")
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.resCode !== 0) {
        message.error(response.data.message)
        return Promise.reject(response);
    } else {
        return response
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service