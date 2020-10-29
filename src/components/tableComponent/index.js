import React, { Component, Fragment } from 'react';
import { Table } from "antd"
import { tableList } from "@api/common"

class TableComponent extends Component {
    constructor(props) {
        console.log(props)
        super(props)
        this.state = {
            dataSource: [],
            selectArr: []
        }
    }

    componentDidMount() {
        this.props.onRef(this)
        this.getList()
    }

    getList = () => {
        const { method, url, data } = this.props.tableConfig
        const setData = { method, url, data }
        tableList(setData).then(res => {
            this.setState({
                dataSource: res.data.data.data
            })
        })
    }

    // 复选
    changeCheckBox = (selectedRowKeys) => {
        this.props.batchDelId(selectedRowKeys)
    }

    render() {
        const { dataSource } = this.state
        const { columns, checkbox, rowKeys } = this.props.tableConfig
        const rowSelection = {
            onChange: this.changeCheckBox
        }
        return (
            <Fragment>
                <Table rowKey={rowKeys} rowSelection={checkbox ? { ...rowSelection } : null} columns={columns} dataSource={dataSource} bordered className="list_table" pagination={false} />
            </Fragment>
        );
    }
}

export default TableComponent;