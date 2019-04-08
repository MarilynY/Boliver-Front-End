import React from 'react';
import {Popconfirm, Form, Input, Button, message, Skeleton, Card, Avatar, Spin} from 'antd';
import { API_ROOT, TOKEN_KEY, AUTH_HEADER} from '../constants';
import { Footer } from './Footer';
import { CardBot } from './CardBot';

const { Meta } = Card;
function confirm() {
    message.info("I like you too");
}
function ohno() {
  message.info("is that right.");
}
/** useful little tools
   <Spin spinning={this.state.spin} delay={500}></Spin>
*/

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

    setSpin = () => {
      this.setState({ spin: true });
    }

    offSpin = () => {
      this.setState({ spin: false });
    }

    deliveryOptions = () => {
      const { searchRes, loading } = this.state;

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
                <Spin spinning={this.state.spin} delay={200}>
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
                <Spin spinning={this.state.spin} delay={200}>
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
      }else {
        return(
          <div className="divTable"><div className="divTableBody"><div className="divTableRow">
            <div className="divTableCell">
              <div className="cardLeft">
              <Spin spinning={this.state.spin} delay={200}>
                <CardBot 
                  botResult = {searchRes.GroundBot} 
                  robotType = {"ground"} 
                  address = {searchRes.DeliveryAddress} 
                  cLoading = {loading}
                  botAvatar = {<Avatar src={require("../assets/images/groundBot.png")} />}
                  chooseButton = {"Choose GroundBot"} 
                />
              </Spin>
              </div>      
            </div>
            <div className="divTableCell">
              <div className="cardRight">
              <Spin spinning={this.state.spin} delay={200}>
                <CardBot 
                  botResult = {searchRes.Drone} 
                  robotType = {"drone"} 
                  address = {searchRes.DeliveryAddress}
                  botAvatar = {<Avatar src={require("../assets/images/drone.jpg")} />}
                  chooseButton = {"Choose Drone"}
                />
              </Spin>
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
              <Form layout={"horizontal"} onSubmit={this.handleSubmit} onClick={this.offSpin} className="search-form">
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