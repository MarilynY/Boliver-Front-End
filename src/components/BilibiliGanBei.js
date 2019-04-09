import React from 'react';
import { Drawer } from 'antd';

export class BilibiliGanBei extends React.Component {
  state = { visible: true };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Drawer
          placement="top"
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
        >
        <img src={require('../assets/images/ganbei.gif')} alt="哔哩哔哩 干杯！" />
        </Drawer>
      </div>
    );
  }
}