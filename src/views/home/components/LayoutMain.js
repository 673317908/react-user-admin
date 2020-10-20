import React from 'react';
import {  Switch } from "react-router-dom";

import UserList from "../../user/list"
import UserAdd from "../../user/add"

// 私有组件
import PrivateRouter from "../../../components/privateRouter/index"

class LayoutMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <Switch>
                <PrivateRouter exact component={UserList} path="/home/user/list"></PrivateRouter>
                <PrivateRouter exact component={UserAdd} path="/home/user/add"></PrivateRouter>
            </Switch>
        )
    }
}

export default LayoutMain
