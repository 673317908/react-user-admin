import React, { Component, Fragment } from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from "react-router-dom"

// 样式
import "@/views/home/components/Aside.scss"
// 路由
import Router from "@/router/index"
const { SubMenu } = Menu;
class Aside extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedKeys: [],
            openKeys: []
        }
    }
    componentDidMount() {
        const pathname = this.props.location.pathname
        const muenName = pathname.split("/").slice(0, 3).join("/")
        const muenData = {
            selectedKeys: pathname,
            openKeys: muenName
        }
        this.selectMenu(muenData)
    }

    // 有子级菜单
    routerSubMenu = ({ title, key, children }) => {
        return (
            <SubMenu key={key} title={title}>
                {
                    children && children.map(item => {
                        return item.children && item.children.length > 0 ? this.routerSubMenu(item) : this.routerMenuItem(item)
                    })
                }
            </SubMenu>

        )
    }

    // 无子级菜单
    routerMenuItem = ({ title, key }) => {
        return (
            <Menu.Item key={key}>
                <Link to={key}>
                    {title}
                </Link>
            </Menu.Item>
        )
    }

    activeMenu = (e) => {
        const pathname = e.key
        const muenName = pathname.split("/").slice(0, 3).join("/")
        const muenData = {
            selectedKeys: pathname,
            openKeys: muenName
        }
        this.selectMenu(muenData)
    }

    activeSubMenu = (openKeys) => {
        this.setState({
            openKeys:[ openKeys[openKeys.length - 1]],
        })
    }
    // 菜单选中
    selectMenu = ({ selectedKeys, openKeys }) => {
        this.setState({
            selectedKeys: [selectedKeys],
            openKeys: [openKeys]
        })
    }
    render() {
        return (
            <Fragment>
                <div className="logo" />
                <div className="aside_menu">
                    <Menu theme="dark" selectedKeys={this.state.selectedKeys} openKeys={this.state.openKeys} mode="inline" onOpenChange={this.activeSubMenu} onClick={this.activeMenu}>
                        {
                            Router && Router.map(item => {
                                return item.children && item.children.length > 0 ? this.routerSubMenu(item) : this.routerMenuItem(item)
                            })
                        }
                    </Menu>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(Aside);