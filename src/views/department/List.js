import React, { Component, Fragment } from 'react';
import { Form, Input, Button, Table, Pagination, Space, Switch, message, Popconfirm } from "antd"
import { getDepartmentApi, deleteDepartmentApi } from "@api/department"
import "./list.scss"
class DepartmentList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                { title: "部门名称", dataIndex: "name", key: "name" },
                {
                    title: "禁启用", dataIndex: "status", key: "status", render: (text, rowData) => {
                        return <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={rowData.status === "1" ? true : false} />
                    }
                },
                { title: "人数", dataIndex: "number", key: "number" },
                {
                    title: "操作", key: "operation", width: 215, render: (text, record) => {
                        return <Space size="middle">
                            <Button type="primary" onClick={() => this.editItem(record)}>编辑</Button>
                            <Popconfirm
                                title="是否删除当前部门?"
                                onConfirm={() => this.confirm(record.id)}
                                onCancel={this.cancel}
                                okText="确定"
                                cancelText="取消"
                            >
                                <Button type="primary" danger>删除</Button>
                            </Popconfirm>,
                        </Space>
                    }
                    ,
                },
            ],
            dataSource: [],
            pageNumber: 1,
            pageSize: 10,
            total: 0,
            selectArr: [],
            searchKey: ""
        }
    }
    componentDidMount() {
        this.getList()
    }

    // 复选
    changeCheckBox = (selectedRowKeys) => {
        this.setState({
            selectArr: selectedRowKeys
        })
    }

    // 编辑
    editItem = (text) => {
        console.log(text)
    }

    // 删除
    confirm = (id) => {
        deleteDepartmentApi({ id }).then(res => {
            message.info(res.data.message)
            this.getList()
        })
    }

    cancel = () => {
        message.info("取消删除！！")
    }

    batchDel = () => {
        const { selectArr } = this.state
        // if (selectArr !== []) {
        //     let data = {}
        //     selectArr.forEach(item => {
        //         data.id = item
        //     })
        //     deleteDepartmentApi({id:data}).then(res => {
        //         console.log(res)
        //     })
        // }
    }

    // 获取列表数据
    getList = () => {
        const setData = { pageNumber: this.state.pageNumber, pageSize: this.state.pageSize }
        const { searchKey } = this.state
        if (searchKey) { setData.name = searchKey }
        getDepartmentApi(setData).then(res => {
            this.setState({
                total: res.data.data.total,
                dataSource: res.data.data.data
            })
        })
    }

    // 搜索
    onFinish = (values) => {
        this.setState({
            pageNumber: 1,
            pageSize: 10,
            searchKey: values.name
        })
        this.getList()
    }

    render() {
        const { columns, dataSource, total } = this.state
        const rowSelection = {
            onChange: this.changeCheckBox
        }
        return (
            <Fragment>
                <div className="list_filter">
                    <Form layout="inline" onFinish={this.onFinish} >
                        <Form.Item name="name" label="部门名称">
                            <Input placeholder="请输入部门名称" />
                        </Form.Item>
                        <Form.Item shouldUpdate={true}>
                            <Button type="primary" htmlType="submit" > 搜索  </Button>
                        </Form.Item>
                    </Form>
                </div>
                <Table rowSelection={{ ...rowSelection }} rowKey="id" columns={columns} dataSource={dataSource} bordered className="list_table" pagination={false}></Table>
                <Button onClick={this.batchDel}>批量删除</Button>
                <Pagination total={total} showSizeChanger className="list_pag"></Pagination>
            </Fragment>
        );
    }
}

export default DepartmentList;