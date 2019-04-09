import React from 'react';
import { Tabs, Button } from 'antd';
import { Footer } from './Footer.js';
import { Track } from './Track.js';
import { OrderHistory } from './OrderHistory';

export class Home extends React.Component {

    render() {
        const TabPane = Tabs.TabPane;

        function callback(key) {
            console.log(key);
        }

        return (
            <Tabs className="main-tabs" defaultActiveKey="1" onChange={callback}>
                <TabPane className="wrapper" tab="Home" key="1">
                    <div className="box1">
                        <img src={require('../assets/images/info1.jpg')} alt="info1" />   
                        <div className="blackblock">
                            <h2 className="title">About Us</h2>
                        </div>
                        <p className="text">
                            Boliver® is working on ground-robot and drone deliveries, a 
                            “future delivery system - designed to safely
                             get packages to customers in 30 minutes.
                             Our mission is to improve lifestyles by making delivery instant
                            for everyone. We're the first robot delivery service in the world
                            and we’re pioneering an industry, not just a company.
                        </p>
                        
                        <Button className="readmorebutton" href="http://www.fehrandpeers.com/drone-delivery/">Read More</Button>
                    </div>
                    <div className="box2">
                        <img src={require('../assets/images/info2.jpg')} alt="info2" />   
                        <div className="blackblock">
                            <h2 className="title">GroundRobot Delivers</h2>
                        </div>
                        <p className="text">
                            Scout walks at a human pace and appears 
                            large enough to accommodate small and  
                            medium-sized parcels. No word yet what's  
                            under the hood, but the standard sensor   
                            package in autonomous mobile robots   
                            includes GPS, several cameras or stereo 
                            cameras, inertial measuring devices, and  
                            occasionally LiDAR.  
                        </p>
                        <Button className="readmorebutton" href="https://www.fastcompany.com/90291820/8-robots-racing-to-win-the-delivery-wars">Read More</Button> 
                    </div>
                    <div className="box3">
                        <img src={require('../assets/images/info3.png')} alt="info2" /> 
                        <div className="blackblock">
                            <h2 className="title">Drone Delivers</h2>
                        </div>  
                        <p className="text">
                            Boliver’s vision for the drones is a
                            fleet of vehicles equipped with self-operating technology,
                            similar to self-driving cars, where the drones can run
                            independently of a human “pilot.” Automated collision 
                            avoidance technology will allow the drones to avoid
                            crashing into objects or animals while in flight.
                        </p>
                        <Button className="readmorebutton" href="https://www.araglegal.com/individuals/learning-center/topics/home-and-property/six-ways-drone-delivery-could-be-a-game-changer">Read More</Button>
                    </div>
                    <Footer className="footer"/>
                </TabPane>
                <TabPane tab="Ship" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Track" key="3">
                    <Track />
                </TabPane>
                <TabPane tab="History" key="4">
                    <OrderHistory />
                </TabPane>
            </Tabs>

            
        )
    }
}