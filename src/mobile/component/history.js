import React, {Component} from "react";
import {List, NavBar, Icon, Accordion} from 'antd-mobile';
import conf from "../../conf";

const Item = List.Item;
const Brief = Item.Brief;


class history extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const showHistoryListfromMap = this.props.showHistoryListfromMap;
        let token = localStorage.getItem("token");
        let parse = JSON.parse(token);
        fetch(`${conf.domain}/orders/finished`, {
            method: 'GET',
            headers: {
                "Authorization": parse.token,
            },
        })
            .then(response => response.json())
            .then(json => {
                const historyList = json.filter(item=>item.coordinatorId==parse.userId);
                // console.log(historyList);
                showHistoryListfromMap(historyList);
            })
            .catch(function (ex) {
                console.log('parsing failed', ex)
            });
    }

    render() {

        return (<div>
            <NavBar mode="dark"
            >历史订单查询</NavBar>
            <List className="my-list">
                {this.props.historyList.map((i, index) => (
                    <Item key={index} arrow="horizontal" multipleLine onClick={() => {
                    }}>
                        {i.carNo}<Brief>{new Date(i.createDate).toLocaleString('chinese', {hour12: false})}</Brief>
                    </Item>
                ))}
            </List></div>);
    }
}

export default history;