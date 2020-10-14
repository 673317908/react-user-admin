import React, { Component } from 'react';
import { Form, Input, Button, Row, Col,message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

// 验证
import { validate_password } from "../../utils/validate"

//api
import { Login,getSms } from "../../api/account"

export default class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
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
                    <Form.Item name="username" rules={[{ required: true, message: '请输入邮箱!', type: 'email' }]}>
                        <Input value={this.state.email} onChange={this.emailInput} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
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
                                <Button type="danger" className="login-form-button" block onClick={() => this.getCode()} loading={this.state.btnStatus}>
                                    {this.state.btnText}
                                </Button>
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
    emailInput = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    timeDown(value) {
        if (this.getCodeTime) {
            clearInterval(this.getCodeTime)
        }

        this.getCodeTime = setInterval(() => {
            value--
            this.setState({
                btnText: value + 's',
                btnStatus: true
            })

            if (value === 0) {
                clearInterval(this.getCodeTime)
                this.setState({
                    btnText: '重新发送',
                    btnStatus: false
                })
            }
        }, 1000)
    }
    getCode = () => {
        if(!this.state.email){
            message.warning('邮箱不能为空',1);
            return false
        }
        let setData={username:this.state.email,module:"login"}
        this.setState({
            btnText: "发送中",
            btnStatus: true
        })
        getSms(setData).then(res=>{
            console.log(res)
            if(res.resCode===1002){
                message.error(res.data.message,1);
                return false
            }
            message.success(res.data.message,1);
            this.timeDown(3)
        })
    }
    onFinish = (values) => {
        this.setState({
            form: values
        })
        Login().then(res => {
            console.log(res)
        })
    }
}