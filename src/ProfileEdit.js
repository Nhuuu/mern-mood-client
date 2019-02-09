import React, { Component } from 'react'
import SERVER_URL from './constants/server';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';


export default class ProfileEdit extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      redirectToProfile: false
    }
  }


  storeInput = (e) => {
    // update state to reflect user input
    let newState;
    newState = e.target.value
    this.setState({
        [e.target.name]: newState
    })
  }

  updateProfile = (e) => {
    e.preventDefault();
    let token = localStorage.getItem('serverToken');

    Axios.put(SERVER_URL+'/profile/edit/'+this.props.user.id, {
      name: this.state.name, // data to send to the server
      headers: { 
        'Authorization': `Bearer ${token}` // let the server know what data is coming 
      }
    })
    .then(json => {
      console.log(json);
      this.setState({
        redirectToProfile: true
      })
    })
    .catch(error => {
        console.log('ERROR POSTING DATA', error)
    })
  }

  firstCapitalization = (firstName) => {
    return firstName.charAt(0).toUpperCase() + firstName.slice(1)
  }

  render() {
    if(this.state.redirectToProfile){
      return (
        <Redirect to={'/profile'} />
      )
    }
    return (
      <div>
        <form onSubmit={this.updateProfile}>
          <div className="form-control">
            <label name="name">Edit Name:</label>
            <input type="text" name="name" onChange={this.storeInput} value={this.state.name} />
          </div>
          <div className="form-control">
            <input type="submit" value="Update Profile" />
          </div>
        </form>
      </div>
    )
  }
}
