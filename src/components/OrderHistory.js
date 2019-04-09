import React from 'react';
import { Spin, List, Avatar, Empty, Collapse } from 'antd';
import { Footer } from './Footer';
import { TOKEN_KEY, API_ROOT, AUTH_HEADER } from '../constants.js';

export class OrderHistory extends React.Component {
    state = {
        error: '',
        isLoadingOrders: true,
        orders: [],
    }

    componentDidMount() {
        this.loadOrderHistory();
    }

    loadOrderHistory = () => {
        const token = localStorage.getItem(TOKEN_KEY);
        // Fire API call
        fetch(`${API_ROOT}/orderhistory`, {
            method: "GET",
            headers: {
                Authorization: `${AUTH_HEADER} ${token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Fail to load posts.");
            })
            .then((data) => {
                this.setState({
                    isLoadingOrders: false,
                    orders: data ? data : [],
                })
                console.log(this.state.orders);
            })
            .catch((e) => {
                this.setState({
                    isLoadingOrders: false,
                    error: e.message,
                })
            })
    }

    // convertTime = (time) => {
    //     return time.slice(0, 4) + '/' + time.slice(4, 6) + '/' + time.slice(6, 8) + ' ' + time.slice(8, 10) + ':' + time.slice(10, 12) + ':' + time.slice(12, 14)
    // }

    getHistoryOrders = () => {
        const { error, orders, isLoadingOrders } = this.state;
        const Panel = Collapse.Panel;

        if (error) {
            return error;
        } else if (isLoadingOrders) {
            return <Spin tip="Loading history order ... " />;
        } else if (orders && orders.length > 0) {
            return (
                <div className="order-history">
                    <List className="list"
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 2,
                        }}
                        dataSource={orders}
                        renderItem={item => (
                            <List.Item
                                key={item.order_id}
                            // extra={<img width={100} alt="delivered" src={require('../assets/images/delivered.jpeg')} />}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={require("../assets/images/imagebox.png")} alt="imagebox" />}
                                    title={<div className="order-id">Order ID:  {item.order_id}</div>}
                                    description={
                                        <div>
                                            <div className="form-entry">
                                                <div className='form-entry-left'>Ship From: </div>
                                                <div className='form-entry-middle'>Name: <br /> Address:  </div>
                                                <div className='form-entry-right'>{item.sender}<br />{item.origin}</div>
                                            </div>
                                            <div className="form-entry">
                                                <div className='form-entry-left'>Ship To:</div>
                                                <div className='form-entry-middle'>Name: <br /> Address:  </div>
                                                <div className='form-entry-right'>{item.receiver}<br />{item.destination}</div>
                                            </div>
                                        </div>
                                    }
                                />

                                <Collapse bordered={false}>
                                    <Panel header="Detail" key="1">
                                        <div className="form-entry">
                                            <div className='form-entry-left'>Create Time:</div>
                                            {/* <div className='form-entry-right'>{this.convertTime(item.create_time)}</div> */}
                                            <div className='form-entry-right'>{item.create_time}</div>
                                        </div>
                                        <div className="form-entry">
                                            <div className='form-entry-left'>Order Status:</div>
                                            {
                                                item.orderStatus === '0' ? 
                                                (<div className='form-entry-right'>Completed</div>) : 
                                                (<div className='form-entry-right'>Canceled</div>)
                                            }
                                        </div>
                                        <div className="form-entry">
                                            {item.orderStatus === '0' ?
                                                (<div className='form-entry-left'>Completed Time: </div>) :
                                                (<div className='form-entry-left'>Canceled Time: </div>)}
                                            <div className='form-entry-right'>{item.a_arrival}</div>
                                        </div>
                                        <div className="form-entry">
                                            <div className='form-entry-left'>Cost</div>
                                            <div className='form-entry-right'>${item.cost}</div>
                                        </div>
                                        <div className="form-entry">
                                            <div className='form-entry-left'>Robot Type: </div>
                                            <div className='form-entry-right'>{item.robotType}</div>
                                        </div>
                                    </Panel>
                                </Collapse>

                            </List.Item>
                        )} />

                </div>
            );
        } else {
            return <Empty description={"No Order"} />;
        }
    }

    render() {
        return (
            <div>
                {this.getHistoryOrders()}
                <Footer className="footer"/>
            </div>
        )
    }
}