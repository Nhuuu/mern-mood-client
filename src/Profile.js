import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {BarChart} from 'react-easy-chart';
import axios from 'axios';
import SERVER_URL from './constants/server';


class Profile extends Component {
  constructor(){
    super();
    this.state = {
      answers: []
    }
  }

  componentDidMount = () => {
    this.getAnswers()
  }

  getAnswers = () => {
    let token = localStorage.getItem('serverToken');
    axios.post(SERVER_URL + '/answer', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(answerRecorded => { 
      const answerScore = answerRecorded.score;
      console.log("answer hit", answerScore);
      this.setState({ answers: answerScore })
    })
    .catch(err => {
      console.log(err)
    })
  }

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
            <h4>My Mood-rythm This Week</h4>
            <div>  <BarChart
          colorBars
          height={150}
          width={650}
          margin={{top: 0, right: 0, bottom: 30, left: 100}}
          data={[
            {x: 'A', y: 20},
            {x: 'B', y: 30},
            {x: 'C', y: 40},
            {x: 'D', y: 20},
            {x: 'E', y: 40},
            {x: 'F', y: 25},
            {x: 'G', y: 5}
          ]} />  
        </div>

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
