import service from "../utils/request"

export function Login(data) {
    return service.request({
        url: "/login/",
        method: "POST",
        data
    })
}