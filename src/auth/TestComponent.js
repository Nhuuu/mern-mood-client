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
    let token = localStorage.getItem('serverToken');
    console.log('THIS IS THE TOKEN', token)
    fetch(SERVER_URL+'/result/restaurant', {
      method: 'POST',
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



