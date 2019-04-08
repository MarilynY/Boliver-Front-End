import React from 'react';
import { List, Avatar } from 'antd';
import PropTypes from 'prop-types';

export class HistoryFrame extends React.Component {
    static propTypes = {
        images: PropTypes.arrayOf(
            PropTypes.shape({
                user: PropTypes.string.isRequired,
                src: PropTypes.string.isRequired,
                thumbnail: PropTypes.string.isRequired,
                caption: PropTypes.string,
                thumbnailWidth: PropTypes.number.isRequired,
                thumbnailHeight: PropTypes.number.isRequired
            })
        ).isRequired
    }
    render() {
      
        const listData = [];
            for (let i = 0; i < 23; i++) {
            listData.push({
                //href: 'http://ant.design',
                title: `ant design part ${i}`,
                avatar: 'https://delivered85839960.files.wordpress.com/2018/04/cropped-bc17629d-d953-4963-a124-f4303cec2e1d16.png',
                description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
                content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            });
            }

            // const IconText = ({ type, text }) => (
            // <span>
            //     <Icon type={type} style={{ marginRight: 8 }} />
            //     {text}
            // </span>
            // );
        return (
            <div className="historyListWrapper">
                <List className="historyList"
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                    }}
                    dataSource={listData}
                    // footer={<div><b>ant design</b> footer part</div>}
                    renderItem={item => (
                    <List.Item
                        key={item.title}
                        // actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                        extra={<img width={272} alt="delivered" src={require('../assets/images/delivered.jpeg')} />}
                    >
                        <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                        />
                        {item.content}
                    </List.Item>
                    )}
                />
            </div>
        )
    }
}