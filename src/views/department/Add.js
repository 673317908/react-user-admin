import React, { Component } from 'react';
import { Button, Form, Input, InputNumber, Radio, message } from "antd"
import { addDepartmentApi, getDepartmentDetailApi } from "@api/department"

class DepartmentAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formLabel: {
                labelCol: { span: 3 },
                wrapperCol: { span: 20 }
            },
            loading: false
        }
    }

    componentDidMount() {
        if (this.props.location.state.id !== '') {
            this.editDepartment()
        }
    }

    addDepartment = (values) => {
        this.setState({
            loading: true
        })
        addDepartmentApi(values).then(res => {
            message.info(res.data.message)
            this.refs.form.resetFields();
            this.setState({
                loading: false
            })
        })
    }

    editDepartment = (values) => {
        getDepartmentDetailApi({ id: this.state.editId }).then(res => {
            let data = res.data.data
            this.refs.form.setFieldsValue({
                name: data.name,
                number: data.number,
                status: data.status,
                content: data.content
            })
        })
    }
    render() {
        return (
            <div>
                <Form ref="form" initialValues={{ number: 1, status: true }} {...this.state.formLabel} onFinish={this.addDepartment}>
                    <Form.Item label="部门名称" name="name" rules={[{ required: true, message: '请输入部门名称!' }]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="部门人数" name="number" rules={[{ required: true, message: '请输入部门人数!' }]} >
                        <InputNumber min={0} max={100}></InputNumber>
                    </Form.Item>
                    <Form.Item label="禁启用" name="status">
                        <Radio.Group name="radiogroup">
                            <Radio value={false}>禁用</Radio>
                            <Radio value={true}>启用</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="描述" name="content" rules={[{ required: true, message: '请输入部门描述!' }]}>
                        <Input.TextArea></Input.TextArea>
                    </Form.Item>
                    <Form.Item label="">
                        <Button type="primary" htmlType="submit" loading={this.state.loading}>添加</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default DepartmentAdd;