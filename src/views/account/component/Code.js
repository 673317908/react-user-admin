import React, { Component } from 'react';

import { Button, message } from 'antd';

//api
import { getSms } from "../../../api/account"

// 验证
import { validate_username } from "../../../utils/validate"

let getCodeTime = null
class Code extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            module: "",
            btnText: "获取验证码",
            btnStatus: false
        }
    }
    render() {
        return (
            <div>
                <Button type="danger" className="login-form-button" block onClick={() => this.getCode()} loading={this.state.btnStatus}>
                    {this.state.btnText}
                </Button>
            </div>
        );
    }
    componentWillReceiveProps(value) {
        this.setState({
            username: value.username,
            module: value.module
        })
    }
    /**
     * 组件销毁
     */
    componentWillUnmount() {
        clearInterval(getCodeTime)
    }
    timeDown(value) {
        if (getCodeTime) {
            clearInterval(getCodeTime)
        }
        getCodeTime = setInterval(() => {
            value--
            this.setState({
                btnText: value + 's',
                btnStatus: true
            })

            if (value === 0) {
                clearInterval(getCodeTime)
                this.setState({
                    btnText: '重新发送',
                    btnStatus: false
                })
            }
        }, 1000)
    }
    getCode = () => {
        const username = this.state.username
        if (!username) {
            message.warning('邮箱不能为空', 1);
            return false
        }
        if (!validate_username(username)) {
            message.warning('邮箱格式不正确', 1);
            return false
        }
        let setData = { username, module: this.state.module }
        this.setState({
            btnText: "发送中",
            btnStatus: true
        })
        getSms(setData).then(res => {
            console.log(res)
            if (res.resCode === 1002) {
                message.error(res.data.message, 1);
                return false
            }
            message.success(res.data.message, 1);
            this.timeDown(3)
        })
    }
}

export default Code;