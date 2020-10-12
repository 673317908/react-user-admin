import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

// 验证
import { validate_password } from "../../utils/validate"

//api
import { Login } from "../../api/account"

export default class LoginForm extends Component {
    constructor(){
        super()
        this.state={
            form:{}
        }
    }
    getCode= () =>{
       
    }
    onFinish=(values)=>{
        console.log(values)
        this.setState({
            form:values
        })
        // Login().then(res=>{
        //     console.log(res)
        // })
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
                <Form.Item name="username" rules={[{ required: true, message: '请输入邮箱!',type:'email' }]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item name="password" rules={
                    [
                        { required: true, message: '请输入密码!' },
                        { pattern:validate_password,message:"请输入6位至20位数字+字母密码!"}
                    ]
                    }
                    >
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                </Form.Item>
                <Form.Item name="code" rules={[{ required: true, message: '请输入验证码!',len:6 }]}>
                    <Row gutter={16}>
                        <Col span={15}>
                            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Code" />
                        </Col>
                        <Col span={9}>
                            <Button type="danger" className="login-form-button" block onClick={() => this.getCode()} htmlType="submit">
                                获取验证码
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
}