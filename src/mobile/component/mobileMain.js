import React from 'react';
import {TabBar} from 'antd-mobile';
import '../../mobile/component/mobileMain'
import ParkAndTake from "../component/parkAndTake";
import HistoryContainer from "../container/historyContainer"
import {connect} from 'react-redux';
import OrderList from "../container/order/orderListContainer";
import PersonalInfo from "./PersonalInfo";
import PersonalPage from "./PersonalPage";
import FontAwesomeIcon from 'react-fontawesome'
import '../../../node_modules/font-awesome/css/font-awesome.css'
import {Icon} from 'antd'
import globalConfig from '../../conf'

const frontendHost = globalConfig.frontendHost

class mobileMain extends React.Component {

    componentWillMount() {
        let item = localStorage.getItem("token");
        if(!item){
            window.location.href = `${frontendHost}/mobile/login`
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: '抢单',
            hidden: false,
        };
    }

    render() {
        return (
            <div>
                <div style={{position: 'fixed', height: '100%', width: '100%', top: 0}}>
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#33A3F4"
                        barTintColor="white"
                        tabBarPosition="bottom"
                        hidden={this.state.hidden}
                        prerenderingSiblingsNumber={0}
                    >
                        <TabBar.Item
                            title="抢单"
                            key="Robb"
                            icon = {<Icon type="car" />}
                            selectedIcon={<Icon type="car" />}
                            selected={this.state.selectedTab === '抢单'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: '抢单',
                                });
                            }}
                            data-seed="logId"
                        >
                            <OrderList/>

                        </TabBar.Item>
                        <TabBar.Item
                            icon={<Icon type="appstore-o" />}
                            selectedIcon={<Icon type="appstore-o" />}
                            title="停取"
                            key="ParkAndTake"
                            selected={this.state.selectedTab === '停取工作列表'}
                            dot
                            onPress={() => {
                                this.setState({
                                    selectedTab: '停取工作列表',
                                });

                                this.props.dispatch({
                                    type:"NEED_UPDATE",
                                    payload:true
                                })
                                console.log(123);
                            }}
                            data-seed="logId1"
                        >
                            <ParkAndTake/>

                        </TabBar.Item>
                        <TabBar.Item
                            icon={<Icon type="bars" />}
                            selectedIcon={<Icon type="bars" />}
                            title="历史"
                            key="history"

                            selected={this.state.selectedTab === '历史'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: '历史',
                                });
                            }}
                        >
                            <HistoryContainer/>
                        </TabBar.Item>
                        <TabBar.Item
                            icon={<Icon type="user" />}
                            selectedIcon={<Icon type="user" />}
                            title="个人"
                            key="my"
                            selected={this.state.selectedTab === '个人'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: '个人',
                                });
                            }}
                        >

                            <PersonalPage/>

                        </TabBar.Item>
                    </TabBar>
                </div>
            </div>
        );
    }
}





function mapStateToProps(state) {
    return {};
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(mobileMain);
