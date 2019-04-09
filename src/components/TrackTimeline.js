import React from 'react';
import { Timeline } from 'antd';

export class TrackTimeline extends React.Component {
    render() {
        return (
            <Timeline>
                <Timeline.Item color="green"> 
                    Delivered
                </Timeline.Item>

                <Timeline.Item color="red">
                    Delivering package
                </Timeline.Item>

                <Timeline.Item color="red">
                    Retreiving package
                </Timeline.Item>
                    
                <Timeline.Item>
                    Order received
                </Timeline.Item>
            </Timeline>
        )
    }
}