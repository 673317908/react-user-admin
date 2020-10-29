import service from "@/utils/request"

export function tableList(data) {
    return service.request({
        url: data.url,
        method: data.method,
        data: data.data
    })
}