import React, {Component} from 'react';
import {Avatar, Breadcrumb, Icon, Layout, Menu} from 'antd';
import './main.css'
import {Link} from "react-router-dom";
import Lot from "../container/lot";
import Dashboard from "./dashboard";
import  ParkingBoy from "./parkingBoy";
import EmployeeContainer from "../container/employeeContainer"
import conf from "../api/conf";
import OrderTable from "../container/order/orderTableContainer";
import LeavingContainer from "./LeavingContainer";

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

class Main extends Component {

    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        this.setState({collapsed});
    };

    logout = () => {
        localStorage.clear();
        window.location.href = `https://parkinglotsystem.herokuapp.com/login`;
    }

    componentWillMount = () => {
        // console.log(localStorage.getItem("token"))
        if (localStorage.getItem("token") === null) {
            window.location.href = `https://parkinglotsystem.herokuapp.com/login`
        }
        else {
            fetch(`${conf.domain}/userInfo`, {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem("token")
                },
            })
                .then(response => {
                    response.text().then(value => {
                        if (value === "istrue") {
                            console.log("已登录");
                        } else {
                            window.location.href = `https://parkinglotsystem.herokuapp.com/login`
                        }
                    })


                })
                .catch(function (ex) {
                    console.log('parsing failed', ex)
                })

        }

    }

    render() {
        let page = this.props.match.params.page;
        let currentPage;
        let defaultSelectedKeys;
        let breadcrumb;

        if (page === 'lot') {
            currentPage = <Lot/>;
            defaultSelectedKeys = 2;
            breadcrumb = '停车场管理';
        } else if (page === 'boy') {
            currentPage = <ParkingBoy/>;
            defaultSelectedKeys = 3;
            breadcrumb = '停车员管理';

        } else if (page === 'dashboard') {
            currentPage = <Dashboard/>;
            defaultSelectedKeys = 4;
            breadcrumb = '停车场Dashboard';

        } else if (page === 'order') {
            currentPage = <OrderTable/>;
            defaultSelectedKeys = 5;
            breadcrumb = '订单管理';

        }
        else if(page === 'leavingRequest'){
            currentPage = <LeavingContainer/>
            defaultSelectedKeys = 6
            breadcrumb = '请假管理'
        }
        else {
            currentPage = <EmployeeContainer/>;
            defaultSelectedKeys = 1;
            breadcrumb = '员工管理';
        }
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={[`${defaultSelectedKeys}`]} mode="inline">
                        <Menu.Item key="1">
                            <Link to={"/main/employee"}>
                                <Icon type="usergroup-add"/>
                                <span>员工管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={"/main/lot"}>
                                <Icon type="car"/>
                                <span>停车场管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to={"/main/boy"}>
                                <Icon type="aliwangwang-o"/>
                                <span>停车员管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to={"/main/dashboard"}>
                                <Icon type="dashboard"/>
                                <span>停车场Dashboard</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to={"/main/order"}>
                                <Icon type="credit-card"/>
                                <span>订单管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to={"/main/leavingRequest"}>
                                <Icon type="profile"/>
                                <span>请假管理</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header id='header-line'>
                        <Link to={"/login"} onClick={() => {
                            this.logout()
                        }}>
                            <span>{localStorage.getItem("name")}</span>
                            <Avatar id='user-avatar' style={{color: '#f56a00', backgroundColor: '#fde3cf'}}>A</Avatar>
                        </Link>
                    </Header>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                            {
                                currentPage
                            }
                        </div>

                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        ONE PERCENT @2018
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Main;
