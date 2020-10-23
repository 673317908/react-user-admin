import service from "@/utils/request"

// 添加部门
export function addDepartmentApi(data) {
    return service.request({
        url: "/department/add/",
        method: "POST",
        data
    })
}

// 获取部门列表
export function getDepartmentApi(data) {
    return service.request({
        url: "/department/list/",
        method: "POST",
        data
    })
}

// 删除部门
export function deleteDepartmentApi(data) {
    return service.request({
        url: "/department/delete/",
        method: "POST",
        data
    })
}

// 部门禁启用
export function editDepartmentStatusApi(data) {
    return service.request({
        url: "/department/status/",
        method: "POST",
        data
    })
}