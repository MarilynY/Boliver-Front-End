import React from 'react';
import { Drawer } from 'antd';

export class BilibiliGanBei extends React.Component {
  state = {
    visible : this.props.status,
  }
  
  onClose = () => {
    return( this.props.onClose )
  }


  render() {
    console.log(this.state.visible);

    return (
      <div>
        <Drawer
          title="Thanks for using our service!"
          placement="right"
          closable={true}
          onClose={this.onClose()}
          visible={this.props.status}
        >
        <img src={require('../assets/images/ganbei.gif')} alt="哔哩哔哩 干杯！" />
        </Drawer>
      </div>
    );
  }
}