import React from 'react';
import { Icon } from 'antd';

export class TopBar extends React.Component {
    render() {
        return (
            <header className="App-header">

                <div className="App-logo">
                    <img src={require('../assets/images/logo.png')} alt="logo" />
                    <h1 className="App-name-Bo"><span className="App-name-liver">Bo</span>liver</h1>
                    {this.props.isLoggedIn ?
                        <a href="/login" className="logout" onClick={this.props.handleLogout} >
                            <Icon type="logout" /> Logout
                        </a> : null}
                </div>

                <div className="App-text">
                    <p className="Large-font">
                        You pick the location,<br />
                        we will take care of the rest<br />
                    </p>
                    <p className="Small-font">
                        Our mission is to improve lifestyles by making delivery instant<br />
                        for everyone. We're the first robot delivery service in the world<br />
                        and we’re pioneering an industry, not just a company.
                    </p>
                </div>
                
            </header>
        )
    }
}

