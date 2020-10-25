import React, { Component } from 'react'
import { Modal } from "antd"

export default class EditModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    handleOk = (e) => {
       this.props.Ok()
    }

    handleCancel = (e) => {
        this.props.Cancel()
    }

    render() {
        return (
            <div>
                <Modal
                    title={this.props.title}
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                    width="700px"
                >
                    {this.props.children}
                </Modal>
            </div>
        )
    }
}
