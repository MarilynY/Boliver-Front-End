import React from 'react';
import { List, Avatar } from 'antd';
// import { TOKEN_KEY, AUTH_HEADER, API_ROOT } from '../constants';

export class Track extends React.Component {
    
    render() {
       // const data = this.currentOrders();
        const data = [
            {
              title: 'Ant Design Title 1',
            },
            {
              title: 'Ant Design Title 2',
            },
            {
              title: 'Ant Design Title 3',
            },
            {
              title: 'Ant Design Title 4',
            }
          ];
        return (
            <div className="track">
                <List className="list"
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar src={require("../assets/images/imagebox.png")} alt="imagebox" />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>

                    )}
                />
            </div>
        )
    }
}