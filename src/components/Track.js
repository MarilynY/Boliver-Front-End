import React from 'react';
import { List, Avatar, Button } from 'antd';
import { TOKEN_KEY, AUTH_HEADER, API_ROOT } from '../constants';
import { TrackButton } from './TrackButton';

export class Track extends React.Component {

    


    getCurrentOrderInfo = () => {
        /**Fire API call */
        const token = localStorage.getItem(TOKEN_KEY);
        fetch(`${API_ROOT}/currentorder`, {
            headers: {
                Authorization: `${AUTH_HEADER} ${token}`
            }
        })
        .then((response) => {
            if (response.ok) {
                return response.text()
            }
            throw new Error('Fail to get tracking infomation');
        })
        .then((data) => {
            console.log(data)
        })
        .catch((e) => {
            console.log(e);
        });
    }

    
 

    render() {
        //this.getCurrentOrderInfo();
        const data = [
            {
                order_id: 'Order Id: 22019032705031200007',
                estimate_arrival: 'Your order is arriving at 1:00pm 3/24/2019',
            },
            {
                order_id: 'Order Id: 22019032705031200007',
                estimate_arrival: 'Your order is arriving at 1:00pm 3/24/2019',
            }
          ];
        return (
            
            <div className="track" >
                <List className="list"
                    itemLayout="horizontal"
                    dataSource={this.getCurrentOrderInfo()}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar src={require("../assets/images/imagebox.png")} alt="imagebox" />}
                        title={item.order_id}
                        description={item.estimate_arrival}
                        />
                        <TrackButton />
                    </List.Item>
                    )} 
                />
            </div>
        )
    }
}