import React from 'react';
import { Spin, List, Avatar } from 'antd';
import { TOKEN_KEY, API_ROOT, AUTH_HEADER } from '../constants.js';

export class HistoryFrame extends React.Component {
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

    getHistoryOrders = () => {
        const { error, orders, isLoadingOrders } = this.state;

        if (error) {
            return error;
        } else if (isLoadingOrders) {
            return <Spin tip="Loading history order ... " />;
        } else if (orders && orders.length > 0) {
            return (<List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}
                dataSource={orders}
                renderItem={item => (
                    <List.Item className="OrderHistory"
                        key={item.order_id}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={require("../assets/images/imagebox.png")} alt="imagebox" />}
                            title={<div>Order ID:  {item.order_id}</div>}
                            description={
                                <div><b>From: </b>{item.origin} <b>to : </b>{item.destination} <b>receiver: </b> {item.receiver}</div>
                            }
                        />
                        {item.content}
                    </List.Item>
                )} />);
        } else {
            return "No History Orders.";
        }
    }

    render() {
        const listData = [];
        for (let i = 0; i < 23; i++) {
            listData.push({
                //href: 'http://ant.design',
                title: `ant design part ${i}`,
                avatar: 'https://delivered85839960.files.wordpress.com/2018/04/cropped-bc17629d-d953-4963-a124-f4303cec2e1d16.png',
                description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
                content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            });
        }
        return (
            <div className="historyListWrapper">
                <List className="historyList"
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={listData}
                    // footer={<div><b>ant design</b> footer part</div>}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            // actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                            extra={<img width={272} alt="delivered" src={require('../assets/images/delivered.jpeg')} />}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}