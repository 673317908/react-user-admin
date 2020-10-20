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
import LayoutMain from "./components/LayoutMain"

import { setInfo, getInfo } from "../../utils/storage"
const { Header, Sider, Content } = Layout;

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: getInfo("collapsed") || false
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
                        <Content className="layout_content">
                            <LayoutMain></LayoutMain>
                        </Content>
                    </Layout>
                </Layout>
            </Fragment>
        )
    }
    toggle = () => {
        setInfo("collapsed", !this.state.collapsed)
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    onCollapse = collapsed => {
        setInfo("collapsed", !this.state.collapsed)
        this.setState({
            collapsed: !this.state.collapsed
        });
    };
}
