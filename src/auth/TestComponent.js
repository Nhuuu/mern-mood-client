import React, { Component } from 'react';
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
    console.log('sending user info', this.props.user.location)
    fetch(SERVER_URL+'/result/restaurant', {
      method: 'POST',
      headers: {}
    })
    .then(response => {
      console.log(response)
      localStorage.setItem('serverToken')
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



