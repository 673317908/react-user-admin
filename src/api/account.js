import service from "../utils/request"

// 获取验证码
export function getSms(data) {
    return service.request({
        url: "/getSms/",
        method: "POST",
        data
    })
}

// 登录
export function Login(data) {
    return service.request({
        url: "/login/",
        method: "POST",
        data
    })
}