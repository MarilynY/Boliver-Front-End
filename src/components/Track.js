import React from 'react';
import { List, Avatar, Spin } from 'antd';
import { TOKEN_KEY, AUTH_HEADER, API_ROOT } from '../constants';
import { TrackButton } from './TrackButton';
import { CancelButton } from './CancelButton';

export class Track extends React.Component {
    state = {
        error: '',
        isLoadingCurrentOrders: true,
        currentorders: [],
        orderHistoryData: []
    }

    componentDidMount() {
        this.loadCurrentOrders();
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
                    orderHistoryData: data ? data : [],
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
    
    loadCurrentOrders = () => {
            
            const token = localStorage.getItem(TOKEN_KEY);
            // Fire API call
            fetch(`${API_ROOT}/currentorder`, {
                method: "GET",
                headers: {
                    Authorization: `${AUTH_HEADER} ${token}`
                }
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Fail to load current orders.");
            })
            .then((data) => {
                this.setState({
                    isLoadingCurrentOrders: false,
                    currentorders: data ? data : [],
                })
                console.log(this.state.currentorders);
            })
            .catch((e) => {
                this.setState({
                    isLoadingCurrentOrders: false,
                    error: e.message,
                })
                console.log(e);
            })
        
    }


    getCurrentOrders = () => {
        const { error, currentorders, isLoadingCurrentOrders  } = this.state;

        if (error) {
            return error;
        } else if (isLoadingCurrentOrders) {
            return <Spin tip="Loading current orders ... " />;
        } else if (currentorders && currentorders.length > 0) {
            return (
                 <div className="track" >
                    <List className="list"
                        itemLayout="horizontal"
                        dataSource={currentorders}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                avatar={<Avatar src={require("../assets/images/imagebox.png")} alt="imagebox" />}
                                title={<div className="text1">Order ID:  {item.order_id}</div>}
                                description={
                                    <div>
                                        {/* {item.orderStatus == 0 ? "Delivered" : "On the way" } */}
                                        <b>Ship from: </b>{item.sender} <br />
                                        <b className="spacer1"></b>{item.origin} <br />
                                        <b>Ship &nbsp; &nbsp; &nbsp;to: </b>{item.receiver} <br /> 
                                        <b className="spacer2"></b>{item.destination} <br />
                                    </div> 
                                }
                                />
                                <TrackButton currentorder={item} loadCurrentOrders={this.loadCurrentOrders} loadOrderHistory={this.loadOrderHistory}/>
                                <CancelButton currentorder={item} loadCurrentOrders={this.loadCurrentOrders} loadOrderHistory={this.loadOrderHistory}/>
                            </List.Item>    
                        )} 
                    />
                </div>
            )
        } else {
            return "No History Orders.";
        }
    }

    render() {
       
        return (
            <div>
                {this.getCurrentOrders()}
            </div>
        )
    }
}