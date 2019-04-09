import React from 'react';
import { Drawer, Button } from 'antd';

export class HidingMusume extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button onClick={this.showDrawer}>{this.props.chooseButton}</Button>
        <Drawer
          title="I'll be back _(:з」∠)_"
          placement="right"
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
        >
        <img src={require('../assets/images/hide.gif')} alt="..." />
        </Drawer>
      </div>
    );
  }
}