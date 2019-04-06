import React from 'react';
import { Tabs } from 'antd';
import { Footer } from './Footer.js';
import { Track } from './Track.js';
import { CreateSearchForm } from './SearchRoutes.js';
import { OrderHistory } from './OrderHistory';
//import { RoutesRes } from './RoutesRes';

export class Home extends React.Component {

    getFormRef = (formInstance) => {
        this.form = formInstance;
    }

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
                            I'm a paragraph. Click here to add your own<br />
                            text and edit me. I’m a great place for you to<br /> 
                            tell a story and let your users know a little<br />
                            more about you.
                        </p>
                        <p className="text">
                            This is a great space to write long text about<br /> 
                            your company and your services. You can use<br /> 
                            this space to go into a little more detail about<br /> 
                            your company.
                        </p>
                    </div>
                    <div className="box2">
                        <img src={require('../assets/images/info2.jpg')} alt="info2" />   
                        <div className="blackblock">
                            <h2 className="title">GroundRobot Delivers</h2>
                        </div>
                        <p className="text">
                            I'm a paragraph. Click here to add your own<br />
                            text and edit me. I’m a great place for you to<br /> 
                            tell a story and let your users know a little<br />
                            more about you.
                        </p>
                        <p className="text">
                            This is a great space to write long text about<br /> 
                            your company and your services. You can use<br /> 
                            this space to go into a little more detail about<br /> 
                            your company.
                        </p>
                    </div>
                    <div className="box3">
                        <img src={require('../assets/images/info3.png')} alt="info2" /> 
                        <div className="blackblock">
                            <h2 className="title">Drone Delivers</h2>
                        </div>  
                        <p className="text">
                            I'm a paragraph. Click here to add your own<br />
                            text and edit me. I’m a great place for you to<br /> 
                            tell a story and let your users know a little<br />
                            more about you.
                        </p>
                        <p className="text">
                            This is a great space to write long text about<br /> 
                            your company and your services. You can use<br /> 
                            this space to go into a little more detail about<br /> 
                            your company.
                        </p>
                    </div>
                    <Footer className="footer"/>
                </TabPane>
                
                <TabPane tab="Ship" key="2"> 
                    <CreateSearchForm ref ={this.getFormRef} />
                    {/* <RoutesRes /> */}
                </TabPane>

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