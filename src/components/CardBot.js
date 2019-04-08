import React from 'react';
import { Button, Skeleton, Card, Modal, message } from 'antd';
import { API_ROOT, TOKEN_KEY, AUTH_HEADER} from '../constants';
import { SenRecForm } from './SenderReceiverForm';

const { Meta } = Card;

export class CardBot extends React.Component{
    constructor() {
        super();
        this.state = {
          loading: true,
          visible: false,
          spin: false,
          confirmLoading: false,
        };
    }
  
    handleOk = () => {
      this.form.validateFields((err, values) => {
        if(!err){
          const parameter = {
            origin : this.props.address.origin,
            destination : this.props.address.destination,
            travel_time : String(Math.ceil(this.props.botResult.travel_time)),
            cost : String(Math.ceil(this.props.botResult.cost)),
            sender : values.sender,
            receiver : values.receiver,
            address : this.props.botResult.base,
            type : this.props.robotType,
          }
          console.log("before firing submitOrder API: " + JSON.stringify(parameter));
      
          // Fire API Call
          const token = localStorage.getItem(TOKEN_KEY);
          fetch(`${API_ROOT}/submitorder`, {
            method: 'POST',
            headers:{
              Authorization: `${AUTH_HEADER} ${token}`
            },
            body: JSON.stringify({
              origin : parameter.origin,
              destination : parameter.destination,
              travel_time : parameter.travel_time,
              cost : parameter.cost,
              sender : parameter.sender,
              receiver : parameter.receiver,
              address : parameter.address,
              type : parameter.type
              ,
            }),
          })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText)
            })
            .then ((data) => {
                this.setState({
                  loading: false,
                  spin: false,
                  visible: false,
                })
                message.success("your order has been successfully placed!")
                console.log(data)
            })
            .catch((e) => {
                message.error("something went wrong when trying to place your order _(¦3」∠)_")
                console.log(e)
            })
        }
      });
    }
  
    handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
        visible: false,
    });
    }

    showModal = () => {
      this.setState({
        visible: true,
      });
    }

    saveFormRef = (formInstance) => {
      this.form = formInstance;
    }

    render() {
        const { visible, confirmLoading } = this.state;
        const pickup_time  = String(Math.ceil(this.props.botResult.pickup_time)) + " minutes";
        const cost = String(Math.ceil(this.props.botResult.cost) + " dollar");
        const travel_time  = String(Math.ceil(this.props.botResult.travel_time) + " minutes");
        const travel_distance  = String(Math.ceil(this.props.botResult.travel_distance) + " miles");

        return (
            <div>
                <Card
                  className="Card"
                  actions={[<Button loading={this.props.cLoading} onClick={this.showModal}>{this.props.chooseButton}</Button>]}
                > 
                  <Modal title= {"Confirm & Submit"}
                          centered
                          visible={visible}
                          onOk={this.handleOk}                     
                          okText="Confirm"
                          confirmLoading={confirmLoading}
                          onCancel={this.handleCancel}
                  >
                    <p><b>origin: </b>{this.props.address.origin}</p>
                    <p><b>destination: </b>{this.props.address.destination}</p>
                    <p><b>robot: </b>{this.props.robotType}</p>
                    <p><b>pickup_time: </b>{pickup_time}</p>
                    <p><b>cost: </b>{cost}</p>
                    
                  <SenRecForm ref={this.saveFormRef}/>

                  </Modal>                 
                  <Skeleton loading={this.props.cLoading} avatar active>
                    <Meta
                      avatar={this.props.botAvatar}
                      // avatar={<Avatar src={require("../assets/images/drone.jpg")} />}
                      description= {
                        <div>
                          <p><b>origin: </b>{this.props.address.origin}</p>
                          <p><b>destination: </b>{this.props.address.destination}</p>
                          <p><b>cost: </b>{cost}</p>
                          <p><b>pickup time: </b>{pickup_time}</p>
                          <p><b>travel time: </b> {travel_time}</p>
                          <p><b>travel distance: </b> {travel_distance}</p>
                          <p><b>dispatch center: </b>{this.props.botResult.base}</p>       
                        </div>
                      }
                    />
                  </Skeleton>
                </Card>
            </div>
        )
    }
}