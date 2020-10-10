import React, { Component, Fragment } from 'react';
import { Button } from 'antd';

export default class Index extends Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render() {
        return (
            <Fragment>
                <Button type="primary">按鈕</Button>
                    首页
            </Fragment>
        )
    }
}
