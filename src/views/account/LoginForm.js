import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

// 验证
import { validate_password, validate_email } from "../../utils/validate"

// 存储
import { setInfo } from "../../utils/storage"

//api
import { Login } from "@api/account"

// 组件
import Code from "./component/Code"

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            module: "login",
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
                        <Button type="primary" htmlType="submit" className="login-form-button" block loading={this.state.btnStatus}>
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
        let setData = { username: values.username, password: values.password, code: values.code }
        this.setState({
            btnStatus: true
        })
        Login(setData).then(res => {
            message.success(res.data.message, 1)
            let token=res.data.data.token
            let username=res.data.data.username
            setInfo("user_token",token)
            setInfo("user_name",username)
            if (res.data.resCode === 0) {
                this.setState({
                    btnStatus: false
                })
                this.props.history.push("/home")
            }
        })
    }
}

export default withRouter(LoginForm)