const router = [
    {
        key: "/home/index",
        title: "控制台",
        icon: ""
    },
    {
        key: "/home/user",
        title: "用户管理",
        icon: "",
        children: [
            {
                key: "/home/user/list",
                title: "用户列表",
                icon: ""
            },
            {
                key: "/home/user/add",
                title: "添加用户",
                icon: ""
            },
        ]
    },
    {
        key: "/home/department",
        title: "部门管理",
        icon: "",
        children: [
            {
                key: "/home/department/list",
                title: "部门列表",
                icon: ""
            },
            {
                key: "/home/department/add",
                title: "添加部门",
                icon: ""
            },
        ]
    },
    {
        key: "/home/position",
        title: "职位管理",
        icon: "",
        children: [
            {
                key: "/home/position/list",
                title: "职位列表",
                icon: ""
            },
            {
                key: "/home/position/add",
                title: "添加职位",
                icon: ""
            },
        ]
    },
    {
        key: "/home/leave",
        title: "请假",
        icon: ""
    },
    {
        key: "/home/overtime",
        title: "加班",
        icon: ""
    }
]

export default router