import React from 'react';
import {scrambleOrderTurnToAccess,getOrderList1} from "../action";
import conf from "./conf";
import {Modal} from "antd-mobile";

function success() {
    const modal = Modal.success({
        title: '抢单成功',
        content: '请尽快处理订单',
        cancelText:''
    });
    setTimeout(() => modal.destroy(), 1000);
}

function fail() {
    const modal = Modal.error({
        title: '抢单失败',
        content: '该订单已被抢走或者你的停车场已满',
    });
    // setTimeout(() => modal.destroy(), 1000);
}
export const scrambleOrder1=(orderId,dispatch)=>{

    let item = localStorage.getItem("token");
    let parse = JSON.parse(item);
    console.log("手机端");
    console.log(parse.userId);
    fetch(`${conf.domain}/orders/${orderId}?operation=robOrder&coordinatorId=${parse.userId}`, {
            method: 'PATCH',
            headers:
                {'Authorization': parse.token}
        })
            .then(response=> {
                if (response.status==403){
                    fail();
                }else{
                    const order = response.json();
                    console.log(order);
                    fetch(`${conf.domain}/orders/pending`, {
                        method: 'GET',
                        headers:
                            {'Authorization':parse.token}
                    })
                        .then(response => response.json())
                        .then(json => {
                            const orderList = json;
                            success();
                            dispatch(scrambleOrderTurnToAccess(orderList));
                            // history.push("/parkAndTake")
                            // // window.location.href="/parkAndTake";
                        })
                        .catch(function (ex) {
                            console.log('parsing failed', ex)
                        });
                }
            })
            .catch(function (ex) {
                console.log('parsing failed', ex)
            });
}

export const getOrderList=(dispatch)=>{
    let item = localStorage.getItem("token");
    let parse = JSON.parse(item);
    fetch(`${conf.domain}/orders/pending`, {
        method: 'GET',
        headers:
            {'Authorization':parse.token}
    })
        .then(response => response.json())
        .then(json => {
            const orderList = json;
            dispatch(getOrderList1(orderList));
        })
        .catch(function (ex) {
            console.log('parsing failed', ex)
        });
}

