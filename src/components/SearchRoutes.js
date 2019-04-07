import React from 'react';
import {Popconfirm, Form, Input, Button, message, Skeleton, Card, Modal, Avatar, Spin} from 'antd';
import { API_ROOT, TOKEN_KEY, AUTH_HEADER} from '../constants';
import { Footer } from './Footer.js';

const { Meta } = Card;
function confirm() {
    message.info("I like you too");
}
function ohno() {
  message.info("is that right.");
}

class SearchForm extends React.Component {
    constructor() {
      super();
      this.state = {
        formItemLayout: { labelCol: { span: 4 }, wrapperCol: { span: 14 } },
        buttonItemLayout: { wrapperCol: { span: 14, offset: 4 } },
        loading: true,
        visible: false,
        spin: false,
        confirmLoading: false,
        searchRes: null,
      };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem(TOKEN_KEY);

        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Inputs for searchRoutes: ', values);
            this.setSpin();
            //Fire API Call
            fetch(`${API_ROOT}/searchroute`, {
              method: 'POST',
              headers:{
                Authorization: `${AUTH_HEADER} ${token}`
              },
              body: JSON.stringify({
                  origin: values.origin,
                  destination: values.destination,
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
                    searchRes: data ? data : null,
                  })
                  message.success("success!")
                  console.log(this.state.searchRes);
                  
              })
              .catch((e) => {
                  message.error("fail:(")
                  console.log(e)
              })
          }
        });
    }

    showModal = () => {
      this.setState({
        visible: true,
      });
    }

    handleOk = () => {
      const{ searchRes } = this.state;
      const test = {
        origin : searchRes.DeliveryAddress.origin,
        destination : searchRes.DeliveryAddress.destination,
        travel_time : String(searchRes.GroundBot.travel_time),
        cost : String(searchRes.GroundBot.cost),
        sender : "pipiMei",
        receiver : "pipiKo",
        address : searchRes.GroundBot.base,
        type : "ground",
      }
      console.log("before firing submitOrder API: " + JSON.stringify(test));

      // //Fire API Call
      // const token = localStorage.getItem(TOKEN_KEY);
      // fetch(`${API_ROOT}/submitorder`, {
      //   method: 'POST',
      //   headers:{
      //     Authorization: `${AUTH_HEADER} ${token}`
      //   },
      //   body: JSON.stringify({
      //     origin : test.origin,
      //     destination : test.destination,
      //     travel_time : test.travel_time,
      //     cost : test.cost,
      //     sender : test.sender,
      //     receiver : test.receiver,
      //     address : test.address,
      //     type : test.type
      //     ,
      //   }),
      // })
      //   .then((response) => {
      //       if (response.ok) {
      //           return response.json();
      //       }
      //       throw new Error(response.statusText)
      //   })
      //   .then ((data) => {
      //       this.setState({
      //         loading: false,
      //         spin: false,
      //         visible: false,
      //       })
      //       message.success("your order has been successfully placed!")
      //       console.log(data)
      //   })
      //   .catch((e) => {
      //       message.error("something went wrong when trying to place your order _(¦3」∠)_")
      //       console.log(e)
      //   })
    }

    handleCancel = () => {
      console.log('Clicked cancel button');
      this.setState({
        visible: false,
      });
    }

    setSpin = () => {
      this.setState({ spin: true });
    }
 
    /** useful little tools
       <Spin spinning={this.state.spin} delay={500}></Spin>
    */

    deliveryOptions = () => {
      const { searchRes, loading, confirmLoading, visible} = this.state;

      if(searchRes == null){
        return(
          <div className="divTable"><div className="divTableBody"><div className="divTableRow">
          <div className="divTableCell">
            <div className="cardLeft">
              <Card className="CardLoading" actions={[
                    <Popconfirm 
                      title={"So you like to roll?"} 
                      onConfirm={confirm} 
                      onCancel={ohno} 
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button >Choose GroundBot</Button>
                    </Popconfirm>]}
                  > 
                    <Spin spinning={this.state.spin} delay={500}>
                    <Skeleton loading={loading} avatar active>
                      <Meta
                        avatar={<Avatar  src={require("../assets/images/groundBot.png" )} />}
                        title="Card title"
                        description=""
                      />
                    </Skeleton>
                    </Spin>
                  </Card>
            </div>
          </div>
          <div className="divTableCell">
            <div className="cardRight">
            <Card className="CardLoading" actions={[
                <Popconfirm 
                title={"So you like to fly?"} 
                onConfirm={confirm} 
                onCancel={ohno} 
                okText="Yes"
                cancelText="No"
                >
                  <Button >Choose Drone</Button>
                </Popconfirm>]}
              >
                <Spin spinning={this.state.spin} delay={500}>
                <Skeleton loading={loading} avatar active>
                  <Meta
                    avatar={<Avatar src={require("../assets/images/drone.jpg")} />}
                    title="Card title"
                    description=""
                  />
                </Skeleton>
                </Spin>
              </Card>
            </div>
          </div>
          </div></div></div>
        )
      }else if(searchRes != null){
        return(
          <div className="divTable"><div className="divTableBody"><div className="divTableRow">
            <div className="divTableCell">
              <div className="cardLeft">
                <Card
                  className="Card"
                  actions={[<Button loading={loading} onClick={this.showModal}>Choose GroundBot</Button>]}
                > 
                  <Spin spinning={this.state.spin} delay={500}>
                    <Modal title="Title: Ground Bot"
                           centered
                           visible={visible}
                           onOk={this.handleOk}                     
                           okText="Confirm"
                           confirmLoading={confirmLoading}
                           onCancel={this.handleCancel}
                    >
                      <p>{searchRes.DeliveryAddress.origin}</p>
                      <p>{searchRes.DeliveryAddress.destination}</p>
                      <p>{searchRes.GroundBot.pickup_time}</p>
                    </Modal>
                  </Spin>
                  <Skeleton loading={loading} avatar active>
                    <Meta
                      avatar={<Avatar  src={require("../assets/images/groundBot.png" )} />}
                      // title="Ground Robot"
                      description= {
                        <div>
                          <p><b>origin: </b>{searchRes.DeliveryAddress.origin}</p>
                          <p><b>destination: </b>{searchRes.DeliveryAddress.destination}</p>
                          <p><b>cost: </b>{searchRes.GroundBot.cost} dollar</p>
                          <p><b>pickup time: </b>{searchRes.GroundBot.pickup_time} minutes</p>
                          <p><b>travel time: </b> {searchRes.GroundBot.travel_time} minutes</p>
                          <p><b>travel distance: </b> {searchRes.GroundBot.travel_distance} miles</p>
                          <p><b>dispatch center: </b>{searchRes.GroundBot.base}</p>       
                        </div>
                      }
                    />
                  </Skeleton>
                </Card>
              </div>      
            </div>
            <div className="divTableCell">
              <div className="cardRight">
                <Card
                  className="Card"
                  actions={[<Button loading={loading} onClick={this.showModal}>Choose Drone</Button>]}
                >
                  <Modal title="Title: Drone"
                          centered
                          visible={visible}
                          onOk={this.handleOk}
                          okText="Confirm"
                          confirmLoading={confirmLoading}
                          onCancel={this.handleCancel}
                  >
                    <p>{searchRes.DeliveryAddress.origin}</p>
                    <p>{searchRes.DeliveryAddress.destination}</p>
                    <p>{searchRes.Drone.pickup_time}</p>
                  </Modal>
                  <Skeleton loading={loading} avatar active>
                    <Meta
                      avatar={<Avatar src={require("../assets/images/drone.jpg")} />}
                      // title="Drone"
                      description={
                        <div>
                          <p><b>origin: </b>{searchRes.DeliveryAddress.origin}</p>
                          <p><b>destination: </b>{searchRes.DeliveryAddress.destination}</p>
                          <p><b>cost: </b>{searchRes.Drone.cost} dollar</p>
                          <p><b>pickup time: </b>{searchRes.Drone.pickup_time} minutes</p>
                          <p><b>travel time: </b> {searchRes.Drone.travel_time} minutes</p>
                          <p><b>travel distance: </b> {searchRes.Drone.travel_distance} miles</p>
                          <p><b>dispatch center: </b>{searchRes.Drone.base}</p>       
                        </div>
                      }
                    />
                  </Skeleton>
                </Card>
              </div>
            </div>
          </div></div></div>
        )
      }
    }

    render() {
      const { formItemLayout, buttonItemLayout } = this.state;
      const { getFieldDecorator } = this.props.form;

      return (
        <div className="PlaceOrderUI">
          <div className="SearchFormWrapper">
            <div className="SearchForm">
              <Form layout={"horizontal"} onSubmit={this.handleSubmit} className="search-form">
                <Form.Item label="Pick-up Addr" {...formItemLayout} >
                  {getFieldDecorator('origin', {
                    rules: [{ required: true, message: 'pick-up address cannot be empty' }],
                  })(
                    <Input type="text" placeholder="Street, City, State Zip" />
                  )}
                </Form.Item>
                <Form.Item label="Destination" {...formItemLayout} >
                  {getFieldDecorator('destination', {
                    rules: [{ required: true, message: 'destination cannot be empty' }],
                  })(
                    <Input type="text" placeholder="Street, City, State Zip" />
                  )}
                </Form.Item>
                <Form.Item {...buttonItemLayout}>
                  <div className="searchBtn">
                    <Button type="primary" htmlType="submit" className="search-form-button" >Search</Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
          {this.deliveryOptions()}
          <Footer className="footer"/>
        </div>
      );
    }
  }

  export const CreateSearchForm = Form.create()(SearchForm);
