import React from 'react';
import { Modal, Button } from 'antd';
import { TOKEN_KEY, AUTH_HEADER, API_ROOT } from '../constants';
/**pass currentorders data from track.js to here */
export class CancelButton extends React.Component {

    state = {
        visible: false,

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
        console.log(this.props.currentorder.orderStatus);
    }

    handleClose = () => {
        this.setState({ visible: false });
    }

    handleNo = () => {
        this.setState({ visible: false });

    }

    handleYes = () => {
        // const order_id = this.props.currentorder.order_id;

        this.setState({ visible: false });
        const token = localStorage.getItem(TOKEN_KEY);
        console.log(this.props.currentorder.order_id);

        // Fire API call - cancelorder
        fetch(`${API_ROOT}/cancelorder`, {
            method: "POST",
            body: JSON.stringify({
                order_id: this.props.currentorder.order_id
            }),
            headers: {
                Authorization: `${AUTH_HEADER} ${token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Fail to cancel order.");
            })
            .then((data) => {
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            })

    }


    render() {
        const { visible } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Cancel
            </Button>

                {this.props.currentorder.orderStatus === '2' ?

                    <Modal
                        visible={visible}
                        title={<div><b>Order Id: </b> {this.props.currentorder.order_id}</div>}
                        onCancel={this.handleClose}
                        footer={[
                            <Button key="no" onClick={this.handleNo}>No</Button>,
                            <Button key="yes" onClick={this.handleYes}>Yes</Button>,
                        ]}
                    >
                        <p className="textStyle">Do you really want to cancle your order?</p>
                    </Modal> :

                    <Modal
                        visible={visible}
                        title={<div><b>Order Id: </b> {this.props.currentorder.order_id}</div>}
                        onCancel={this.handleClose}

                        footer={[
                            <Button key="back" onClick={this.handleClose}>Close</Button>,
                        ]}
                    >
                        <p className="textStyle"> Sorry, your order is on the way or has been delivered. Cancellation is not available now.</p>
                    </Modal>}

            </div>
        );
    }
}