import React from 'react';
import { Modal, Button } from 'antd';
import { TrackTimeline } from './TrackTimeline';

export class TrackButton extends React.Component {
    state = {
        visible: false,
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleClose = () => {
        this.setState({ visible: false });
    }

    render() {
        const { visible } = this.state;
        return (
            <div>
            <Button type="primary" onClick={this.showModal}>
                Track
            </Button>
            <Modal
                visible={visible}
                title="Your Order Status:" //or put order Id
                onCancel={this.handleClose}
                footer={[
                    <Button key="back" onClick={this.handleClose}>Close</Button>,
                ]}
            >
                <TrackTimeline />
                
            </Modal>
            </div>
        );
    }
}
