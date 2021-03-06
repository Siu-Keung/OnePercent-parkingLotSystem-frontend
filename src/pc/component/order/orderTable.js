import React from 'react';
import  {Table} from 'antd';
import {Modal,Button } from 'antd'
import OrderHeader from "../../container/order/orderHeaderContainer";
import ParkingBoyTableContainer from "../../container/order/parkingBoyTableContainer"
import ParkingBoyTable from "./parkingBoyTable";

const { Column} = Table;
export default  class OrderTable extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.onComponentDidMount()
    }

   showPopupAndsetRecord=(record)=>{
        //修改弹出框的显示属性设置被选择到的记录
        this.props.getChooseOrderRecord(record);

    }

    assignOrder=()=>{
        this.props.OnassignOrder(this.props.orderRecord,this.props.parkingBoyRecord);
    }

    handleOk=()=>{
        this.props.OnchangePopupVisibleValue(false);
    }

    handleCancel=()=>{
        this.props.OnchangePopupVisibleValue(false);
    }

    render(){
        const data = this.props.orderList;
        return(
            <div>
                <OrderHeader/>
                <Table  dataSource={data} rowKey="id">
                    <Column
                        title="id"
                        dataIndex="id"
                        key="id"
                    />
                    <Column
                        title="车牌号"
                        dataIndex="carNo"
                        key="carNo"
                    />

                    <Column
                        title="类型"
                        dataIndex="type"
                        key="type"
                    />
                    <Column
                        title="状态"
                        dataIndex="status"
                        key="status"
                    />
                    <Column
                        title="操作"
                        key="action"
                        render={(text, record) => {
                            return(
                            <span>
                                <a onClick={()=>this.showPopupAndsetRecord(record)}>{record.action!=""?"指派":""} </a>
                            </span>

                        )
                        }}
                    />
                </Table>

                <Modal
                    visible={this.props.assignPopupVisible}
                    title="选择空闲停车员"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>返回</Button>,
                        <Button key="submit" type="primary" onClick={()=>this.assignOrder()}>
                            指派
                        </Button>,
                    ]}
                >
                    <ParkingBoyTableContainer />
                </Modal>

            </div>
        );
    }

}