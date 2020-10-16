import React, { Component, Fragment } from 'react';
import { Layout } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
// 样式
import "./index.scss"

// 组件
import Aside from "./components/Aside"

const { Header, Sider, Content } = Layout;

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false
        }
    }
    render() {
        return (
            <Fragment>
                <Layout className="layout_warp">
                    <Sider className="layout_sider" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <Aside></Aside>
                    </Sider>
                    <Layout>
                        <Header className="layout_header">
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: this.toggle,
                            })}
                        </Header>
                        <Content className="layout_content">Content</Content>
                    </Layout>
                </Layout>
            </Fragment>
        )
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    onCollapse = collapsed => {
        this.setState({ 
            collapsed: !this.state.collapsed
        });
      };
}
