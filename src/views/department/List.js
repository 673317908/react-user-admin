import React, { Component, Fragment } from 'react';
import { Form, Input, Button, Pagination, Space, Switch, message, Popconfirm } from "antd"
import { deleteDepartmentApi, editDepartmentStatusApi } from "@api/department"

import "./list.scss";
import TableComponent from '@c/tableComponent';
class DepartmentList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableConfig: {
                columns: [
                    { title: "部门名称", dataIndex: "name", key: "name" },
                    {
                        title: "禁启用", dataIndex: "status", key: "status", render: (text, rowData) => {
                            return <Switch onChange={() => this.onChange(rowData)} checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={rowData.status === "1" ? true : false} />
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
                method: "post",
                url: "/department/list/",
                checkbox: true,
                data: {
                    pageNumber: 1,
                    pageSize: 10,
                },
                rowKeys: 'id'
            },
            total: 0,
            selectArr: [],
            searchKey: "",
            formLabel: {
                labelCol: { span: 4 },
                wrapperCol: { span: 19 }
            },
        }
    }

    // 编辑
    editItem = (record) => {
        this.props.history.push({ pathname: "/home/department/add", state: { id: record.id } })
    }

    // 删除
    onRef = (ref) => {
        this.TableComponent = ref
    }

    confirm = (id) => {
        deleteDepartmentApi({ id }).then(res => {
            message.info(res.data.message)
            this.TableComponent.getList()
        })
    }

    cancel = () => {
        message.info("取消删除！！")
    }

    // 批量删除
    batchDelId = (values) => {
        this.setState({
            selectArr: values
        })
    }

    batchDel = () => {
        const { selectArr } = this.state
        if (selectArr.length !== 0) {
            let id = selectArr.join()
            deleteDepartmentApi({ id }).then(res => {
                message.info(res.data.message)
                this.TableComponent.getList()
            })
        }
    }

    // 状态
    onChange = (rowData) => {
        const { id, status } = rowData
        const statusData = { id, status: status === "1" ? false : true }
        editDepartmentStatusApi(statusData).then(res => {
            console.log(res)
            message.info(res.data.message)
            this.TableComponent.getList()
        })
    }

    // 搜索
    onFinish = (values) => {
        this.setState({
            pageNumber: 1,
            pageSize: 10,
            searchKey: values.name
        })
        this.TableComponent.getList()
    }

    // 分页
    changePage = (page, pageSize) => {
        console.log(page)
        // console.log(pageSize)
        this.setState({
            pageNumber: page === 0 ? 1 : page,
            pageSize
        }, () => {
            this.TableComponent.getList()
        })
    }

    render() {
        const { total } = this.state

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
                <TableComponent tableConfig={this.state.tableConfig} onRef={this.onRef} batchDelId={this.batchDelId}></TableComponent>
                <Button onClick={this.batchDel}>批量删除</Button>
                <Pagination total={total} showSizeChanger className="list_pag" onChange={this.changePage}></Pagination>
            </Fragment>
        );
    }
}

export default DepartmentList;