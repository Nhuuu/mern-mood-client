import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SERVER_URL from '../constants/server';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      location:''
    };
  }

  handleNameChange = (e) => { this.setState({ name: e.target.value }); }

  handleEmailChange = (e) => { this.setState({ email: e.target.value }); }

  handlePasswordChange = (e) => { this.setState({ password: e.target.value }); }

  handleLocationChange = (e) => { this.setState({ location: e.target.value }); }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('In submit function state is: ', this.state)
    // SEND DATA TO SERVER
    axios.post(`${SERVER_URL}/auth/signup`, this.state)
    .then(response => {
      console.log('Success', response)
      // Assume we have a token that we should save to LS
      localStorage.setItem('serverToken', response.data.token)
      // Need to update... somehow?
      this.props.updateUser()
    })
    .catch(err => {
      console.log('Error when submitting signup form: ', err)
    })
  }

  render() {
    if(this.props.user){
      return (
        <Redirect to="/question" />
        <Food userLocation={this.state.location} />
      );
    }
    return(
        <div>
          <h2>Signup as a new user</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input name="Name" placeholder="What is your name?" value={this.state.name} onChange={this.handleNameChange} />
            </div>
            <div>
              <input name="Email" placeholder="What is your email?" value={this.state.email} onChange={this.handleEmailChange} />
            </div>
            <div>
              <input name="Password" placeholder="Set your password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
            </div>
            <div>
              <input name="Location" type="text" placeholder="Which city do you live in? (ex. Seattle, WA)" value={this.state.location} onChange={this.handleLocationChange} />
            </div>
            <button className="btn waves-effect waves-light" type="submit" name="action">Sign Me Up NOW
              <i className="material-icons right">add</i>
            </button>
          </form>
        </div>
      );
  }
}

export default Signup;
