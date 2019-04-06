import React from 'react';
import {Form, Input, Button, message, Skeleton, Card, Icon, Avatar} from 'antd';
import { API_ROOT, TOKEN_KEY, AUTH_HEADER} from '../constants';

const { Meta } = Card;

class SearchForm extends React.Component {
    constructor() {
      super();
      this.state = {
        formLayout: 'horizontal',
        loading: true,
      };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem(TOKEN_KEY);
        
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Inputs for searchRoutes: ', values);
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
                      return response.json()
                  }
                  throw new Error(response.statusText)
              })
              .then ((data) => {
                  this.setState({
                    loading: false
                  })
                  message.success("success!")
                  console.log(data)
                  
              })
              .catch((e) => {
                  message.error("fail:(")
                  console.log(e)
              })
          }
        });
    }

    render() {
      const { formLayout } = this.state;
      const formItemLayout = formLayout === 'horizontal' ? {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      } : null;
      const buttonItemLayout = formLayout === 'horizontal' ? {
        wrapperCol: { span: 14, offset: 4 },
      } : null;
      const { getFieldDecorator } = this.props.form;
      const { loading } = this.state;

      return (
        <div className="PlaceOrderUI">
          <div>
          <Form layout={formLayout} onSubmit={this.handleSubmit} className="search-form">
            <Form.Item label="Pick-up Addr" {...formItemLayout} >
              {getFieldDecorator('origin', {
                rules: [{ required: true, message: 'pick-up address cannot be empty' }],
              })(
                <Input placeholder="Street, City, State Zip" />
              )}
            </Form.Item>
            <Form.Item label="Destination" {...formItemLayout} >
              {getFieldDecorator('destination', {
                rules: [{ required: true, message: 'destination cannot be empty' }],
              })(
                <Input placeholder="Street, City, State Zip" />
              )}
            </Form.Item>
            <Form.Item {...buttonItemLayout}>
              <div className="searchBtn">
                <Button type="primary" htmlType="submit" className="search-form-button">Search</Button>
              </div>
            </Form.Item>
          </Form>
          </div>

          <div className="divTable">
            <div className="divTableBody">
              <div className="divTableRow">
                <div className="divTableCell">
                  <Card
                    style={{ width: 300, marginTop: 16 }}
                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                  >
                    <Skeleton loading={loading} avatar active>
                      <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title="Card title"
                        description="This is the description"
                      />
                    </Skeleton>
                  </Card>
                </div>
                <div className="divTableCell">
                  <Card
                    style={{ width: 300, marginTop: 16 }}
                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                  >
                    <Skeleton loading={loading} avatar active>
                      <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title="Card title"
                        description="This is the description"
                      />
                    </Skeleton>
                  </Card>
                </div>
              </div>
            </div>
           </div>
        </div>
      );
    }
  }

  export const CreateSearchForm = Form.create()(SearchForm);
