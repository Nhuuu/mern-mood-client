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
    this.getUserInfo()
    this.getAnswers()
    this.getTime()
  }

  getUserInfo = () => {
    return this.props.updateUser;
  }
  

  getAnswers = () => {
    let token = localStorage.getItem('serverToken');
    axios.post(SERVER_URL + '/answer/score/' + this.props.user.id, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(foundAnswers => { 
      console.log(foundAnswers)
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
    axios.post(SERVER_URL + '/answer/score/' + this.props.user.id, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(foundAnswers => { 
      let timeArr=[];
      const answerTime = foundAnswers.data.map((obj, i) => {
          timeArr.push(obj.timestamp.split(" "));
          return timeArr
      })
      console.log(timeArr)
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
      const userScore = Number(this.state.scores);
      const userTime = this.state.timestamp;
      console.log(typeof userTime)
      console.log(userTime);
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
