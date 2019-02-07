import React, { Component } from 'react';
import axios from 'axios';
import SERVER_URL from '../constants/server';

export default class TestComponent extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      location: ''
    }
  }

  sendShit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem('serverToken');
    console.log('token is', token);
    console.log('sending user info', this.props.user.location)
    axios.post(SERVER_URL+'/result/restaurant', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      
      console.log(response)
      localStorage.setItem('serverToken', response.data.token)
    })
    .catch(error => {
      console.log('ERROR POSTING TO THE SERVER', error)
    })
  }

  

  render() {
    return (
      <div>
        <button onClick={this.sendShit}>TEST SENDING USER LOCATION TO THE BACKEND</button>
      </div>
    )
  }
}



