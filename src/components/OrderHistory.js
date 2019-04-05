import React from 'react';
import {Spin} from 'antd';
import { TOKEN_KEY, API_ROOT, AUTH_HEADER } from '../constants.js';

export class OrderHistory extends React.Component{
    state = {
        error : '',
        isLoadingOrders : true,
        orders : [],
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
                    orders : data? data:[],
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

    getHistoryOrders = () =>{
        const { error, orders, isLoadingOrders} = this.state;

        if (error) {
            return error;
        } else if (isLoadingOrders) {
            return <Spin tip="Loading history order ... " />;
        // } else if (posts && posts.length > 0) {
        //     const images = posts.map(({ user, url, message }) => ({
        //         user: user,
        //         src: url,
        //         thumbnail: url,
        //         caption: message,
        //         thumbnailWidth: 400,
        //         thumbnailHeight: 300
        //     }));

        //     return <Gallery images={images} />;
        } else {
            return "No History Orders.";
        }
    }

    render(){
        return (
            <div>
                {this.getHistoryOrders()}
            </div>
        )
    }
}