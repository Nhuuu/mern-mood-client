import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Nav extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    // REMOVE LS TOKEN; UPDATE PARENT STATE
    localStorage.removeItem('serverToken')
    this.props.updateUser();
  }

  render() {
    if(this.props.user){
      return(
      <div className="main-layout">
      <nav className="navbar">
        <div className="nav-wrapper">
          <a href="/" class="brand-logo "> <img src='https://res.cloudinary.com/kellyp/image/upload/v1549305186/smileface.png' className="App-logo" alt="logo" />            </a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            {/* <li><a href="/">Don't Be Salty</a></li> */}
            <li><a href="/result">Today's Mood</a></li>
            <li><a href="/question">You Got This!</a></li>
            {/* <li><a href="/test-component">TEST COMPONENT</a></li> */}
            <li><a href="/profile">Profile</a></li>
            <li><a onClick={this.handleLogout}>Logout</a></li>
          </ul>
        </div>
      </nav>
      </div>
         );
    }
    else {
      return(
      <div className="main-layout">
      <nav className="navbar">
        <div className="nav-wrapper">
          <a href="/" class="brand-logo "> <img src='https://res.cloudinary.com/kellyp/image/upload/v1549305186/smileface.png' className="App-logo" alt="logo" />            </a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a href="/login">Log In</a></li>
            <li><a href="/signup">Sign Up</a></li>
          </ul>
        </div>
      </nav>
      </div>
        )
      }
      
    
  }
}

export default Nav;
