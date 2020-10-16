import React, { Component, Fragment } from 'react'

import "./login.scss"

import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabData: ['登录', '账号注册'],
            formType: "Login",
            activeIndex: 0
        }
    }
    getCode = (values) => {
        console.log(values)
        console.log(22)
    }
    activeTab = (values) => {
        if (values === 0) {
            this.setState({
                formType: "Login"
            })
        } else {
            this.setState({
                formType: "RegisterFrom"
            })
        }
        this.setState({
            activeIndex: values
        })
    }
    render() {
        let listArr = this.state.tabData.map((item, index) => {
            return (
                <li key={index} onClick={() => this.activeTab(index)} className={this.state.activeIndex === index ? 'active_css' : 'reset_css'}>{item}</li>
            )
        })
        return (
            <Fragment>
                <div className="login_box">
                    <div className="login_info">
                        <div className="login_info_header">
                            <ul>
                                {listArr}
                            </ul>
                        </div>
                        <div className="login_info_form">
                            {this.state.formType === "Login" ? <LoginForm></LoginForm> : <RegisterForm activeTab={this.activeTab}></RegisterForm>}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
