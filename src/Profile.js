import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {BarChart} from 'react-easy-chart';
import axios from 'axios';
import SERVER_URL from './constants/server';


class Profile extends Component {
  constructor(){
    super();
    this.state = {
      scores: '',
      time: ''
    }
  }

  componentDidMount = () => {
    this.getAnswers()
    this.getTime()
  }

  getAnswers = () => {
    let token = localStorage.getItem('serverToken');

    axios.post(SERVER_URL + '/answer/score/', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(foundAnswers => { 
      const answerScore = foundAnswers.data.map((obj, i) => {
        return obj.score;
      })
      console.log("score hit", answerScore);
      this.setState({ scores: answerScore })
    })
    .catch(err => {
      console.log(err)
    })
  }

  getTime = () => {
    let token = localStorage.getItem('serverToken');
    console.log('---------------------------------')
    axios.post(SERVER_URL + '/answer/score/', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(foundAnswers => { 
      const answerTime = foundAnswers.data.map((obj, i) => {
        return obj.timestamp;
      })
      console.log("timestamp hit", answerTime);
      this.setState({ time: answerTime })
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
      const userScore = this.state.scores;
      const userTime = this.state.timestamp;
      console.log(userScore);
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
            {x: {userTime}, y: {userScore}},
            {x: {userTime}, y: {userScore}},
            {x: {userTime}, y: {userScore}},
            {x: {userTime}, y: {userScore}},
            {x: {userTime}, y: {userScore}},
            {x: {userTime}, y: {userScore}},
            {x: {userTime}, y: {userScore}}
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
