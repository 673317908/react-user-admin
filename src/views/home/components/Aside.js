import React, { Component } from 'react';
// 路由菜单
import RouterMenu from "../../../components/menu/index"
// 样式
import "./Aside.scss"
class Aside extends Component {
    render() {
        return (
            <RouterMenu></RouterMenu>
        );
    }
}

export default Aside;