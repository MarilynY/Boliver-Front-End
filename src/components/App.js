import React, { Component } from 'react';
import { TopBar } from './TopBar';
import { Main } from './Main';
import { TOKEN_KEY,AUTH_HEADER, API_ROOT } from '../constants';

class App extends Component {

  state = {
    isLoggedIn: !!localStorage.getItem(TOKEN_KEY) 
  }

  //callback function 1
  handleLogin = (token) => {
    this.setState({ isLoggedIn: true });
    localStorage.setItem(TOKEN_KEY, token);
  }

  //callback function 2
  handleLogout = () => {
    this.setState({ isLoggedIn: false });
    const token = localStorage.getItem(TOKEN_KEY);
    // Fire API call
    fetch(`${API_ROOT}/logout`, {
        method: "GET",
        headers: {
            Authorization: `${AUTH_HEADER} ${token}`
        }
    })
    localStorage.removeItem(TOKEN_KEY);
  }


  render() {
    return (
      <div className="App">
        {/* {this.state.isLoggedIn ? 'login': 'logout'}
        <button onClick={this.state.isLoggedIn ? this.handleLogout : this.handleLogin}>flip</button> */}
        <TopBar 
          isLoggedIn={this.state.isLoggedIn}
          handleLogout={this.handleLogout}
        />
        
        <Main 
          isLoggedIn={this.state.isLoggedIn}
          handleLogin={this.handleLogin}
        />
      </div>
    );
  }
}

export default App;
