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
    let links = '';
    if(this.props.user){
      links = (
          <span>
            <a onClick={this.handleLogout}>Logout</a>
            <Link to="/profile">Profile</Link>
          </span>
        );
    }
    else {
      links = (
          <span>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link> 
          </span>
        );
    }
    return(
        <div className="nav-wrapper">
          <nav className="nav">
            <div className="leftlogo">
              <Link to="/">Don't Be Salty</Link>
            </div>
            <div className="rightnav">
              <Link to="/result">Today's Mood</Link> 
              <Link to="/questionform">Questions</Link> 
              <Link to="/test-component">TEST COMPONENT</Link>
              {links}
            </div>
          </nav>
          <header>
            <div className="logo-wrapper">
              <img src='https://res.cloudinary.com/kellyp/image/upload/v1549305186/smileface.png' className="App-logo" alt="logo" />            
            </div>
          </header>
        </div>
      );
  }
}

export default Nav;
