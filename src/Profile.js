import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Profile extends Component {


  
  // Write helper function to capitalize the first letter of the first name of user
  firstCapitalization = (firstName) => {
    return firstName.charAt(0).toUpperCase() + firstName.slice(1)
  }

  render() {
    if(this.props.user){
      return (
          <div>
            <h2>Hello again, {this.firstCapitalization(this.props.user.name)}!</h2>
            <h4>Your email is {this.props.user.email}</h4>
            <h4>Your current location is {this.props.user.location}</h4>
            <Link to="/profile/edit">Edit Profile</Link>
          </div>
        );
    }
    return(
      <div>
        <p>This is a profile page. You must be logged in to see it.</p>
        <p>Would you like to <a href="/login">Log In</a> or <a href="/signup">Sign up</a>?</p>
      </div>
      );
  }
}

export default Profile;
