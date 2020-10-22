import React from 'react';
import { Switch } from "react-router-dom";

// 私有组件
import PrivateRouter from "../privateRouter/index"

import Components from "./Components"

class LayoutMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <Switch>
                {
                    Components.map(item => {
                        return <PrivateRouter exact key={item.path} component={item.component} path={item.path}></PrivateRouter>
                    })
                }
            </Switch>
        )
    }
}

export default LayoutMain
