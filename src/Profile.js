import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {BarChart} from 'react-easy-chart';
import axios from 'axios';
import SERVER_URL from './constants/server';


class Profile extends Component {
  constructor(){
    super();
    this.state = {
      userInput: [{}]
    }
  }

  componentDidMount = () => {
    this.getUserData()
  }

  getUserData = () => {
    let token = localStorage.getItem('serverToken');
    axios.post(SERVER_URL + '/answer/score', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(foundAnswers => { 
      console.log('doug1', foundAnswers)
      const userInput = foundAnswers.data.map((obj, i) => {
        return { x: obj.timestamp.slice(0,10), y: obj.score }
      })
      console.log("userinput hittttttttt", userInput);
      console.log("time test", userInput[0])
      this.setState({ userInput : userInput })
    })
    .catch(err => {
      console.log(err)
    })
  }


  // Helper function to capitalize the first letter of the first name of user
  firstCapitalization = (firstName) => {
    return firstName.charAt(0).toUpperCase() + firstName.slice(1)
  }

  render() {
    if(this.props.user){
      const userInput = this.state.userInput;
      console.log("userInput render hit", userInput)
      return (
        <div className="overall-style">
          <h3>Hello again, <i>{this.firstCapitalization(this.props.user.name)}</i> !</h3>
          <h4>Your email is <b>{this.props.user.email}</b></h4>
          <h4>Your current location is <b>{this.props.user.location}</b></h4>
          <Link to="/profile/edit">Edit Profile</Link>
          <h3 className="center-style-title">My Mood-Rhythm This Week</h3>
          <div className="center-style">  
            <BarChart
              colorBars 
              axes
              height={100}
              width={600}
              margin={{top: 0, right: 0, bottom: 30, left: 100}}
              data= {userInput}
            />  
          </div>
        </div>
      )
    }
    return(
      <div>
        <p>This is a profile page. You must be logged in to see it.</p>
        <p>Would you like to <Link to="/login">Log In</Link> or <Link to="/signup">Sign up</Link>?</p>
      </div>
    )
  }
}

export default Profile;