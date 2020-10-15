import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

// 验证
import { validate_username, validate_pass } from "../../utils/validate"

// 组件
import Code from "./component/Code"

// api
import { Register } from "../../api/account"

export default class RegisterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            module: "register"
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
                        [{ required: true, message: '请输入邮箱!' },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (value) {
                                    if (!validate_username(value)) {
                                        return Promise.reject('邮箱格式不正确!');
                                    }
                                }
                                return Promise.resolve();
                            },
                        }),
                        ]
                    }>
                        <Input onChange={this.usernameInput} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={
                        [
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!validate_pass(value)) {
                                        return Promise.reject('请输入6位至20位数字+字母密码!');
                                    }
                                    if (getFieldValue("checkPassword") && value !== getFieldValue("checkPassword")) {
                                        return Promise.reject('两次密码不一致!');
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]
                    }
                    >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                    </Form.Item>
                    <Form.Item name="checkPassword" rules={[
                        { required: true, message: '请再次输入密码!' },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (value) {
                                    if (getFieldValue('password') !== value) {
                                        return Promise.reject('两次密码不一致!');
                                    }
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="CheckPassword" />
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
                            注册
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
        Register(setData).then(res => {
            message.success(res.data.message,1)
        })
    }
}