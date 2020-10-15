import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

// 验证
import { validate_password, validate_email } from "../../utils/validate"

//api
import { Login } from "../../api/account"

// 组件
import Code from "./component/Code"

export default class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            module:"login",
            btnText: "获取验证码",
            btnStatus: false
        }
    }
    render() {
        return (
            <div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                >
                    <Form.Item name="username" rules={
                        [
                            { required: true, message: '请输入邮箱!' },
                            { pattern: validate_email, message: "邮箱格式不正确!" }
                        ]
                    }>
                        <Input value={this.state.username} onChange={this.usernameInput} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={
                        [
                            { required: true, message: '请输入密码!' },
                            { pattern: validate_password, message: "请输入6位至20位数字+字母密码!" }
                        ]
                    }
                    >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                    </Form.Item>
                    <Form.Item name="code" rules={[{ required: true, message: '请输入验证码!', len: 6 }]}>
                        <Row gutter={16}>
                            <Col span={15}>
                                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Code" />
                            </Col>
                            <Col span={9}>
                                <Code username={this.state.username} module={this.state.module} />
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" block>
                            登录
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
    usernameInput = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    onFinish = (values) => {
        let setData={username:values.username,password:values.password,code:values.code}
        Login(setData).then(res => {
            console.log(res)
            message.success(res.data.message,1)
        })
    }
}