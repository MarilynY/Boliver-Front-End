import React from 'react';
import { Form, Icon, Input, Tooltip } from 'antd';

const FormItem = Form.Item;

class CreateSenderReceiverForm extends React.Component {

 render() {
   const { getFieldDecorator } = this.props.form;
   const formItemLayout = {
     labelCol: { span: 6 },
     wrapperCol: { span: 14 },
   };

   return (
     <Form>
       <div className="senderInput">
       <FormItem {...formItemLayout} label="sender">
         {getFieldDecorator('sender', {
           rules: [{
             required: true,
             message: 'Sender cannot be empty',
           }],
         })(
            <Input
                placeholder="Enter name of sender"
                prefix={<Icon type="smile" theme ="twoTone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                suffix={
                <Tooltip title="Sender does not have to be a person">
                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
                }
            />
         )}
       </FormItem>
       </div>
       <FormItem {...formItemLayout} label="receiver">
         {getFieldDecorator('receiver', {
           rules: [{
             required: true,
             message: 'Receiver cannot be empty',
           }],
         })(
            <Input
                placeholder="Enter name of receiver"
                prefix={<Icon type="smile" theme ="twoTone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                suffix={
                <Tooltip title="Sender does not have to be a person">
                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
                }
            />
         )}
       </FormItem>
     </Form>
   );
 }
}

export const SenRecForm = Form.create()(CreateSenderReceiverForm);
