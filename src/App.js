import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios'; //like fetch, you don't have to parse json
import SERVER_URL from './constants/server';
import './App.css';
import Footer from './layout/Footer';
import Home from './Home';
import Login from './auth/Login';
import Nav from './layout/Nav';
import Profile from './Profile';
import Signup from './auth/Signup';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount = () => {
    this.getUser();
  }

  getUser = () => {
    // SEE IF THERE'S A TOKEN, localStorage is from browser
    let token = localStorage.getItem('serverToken');
    // IF THERE IS, TRY TO GET USER INFO
    if(token){
      console.log('Found token in localStorage', token);
      axios.post(`${SERVER_URL}/auth/current/user`, {
        // all meta data requested
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        console.log('Success!');
        this.setState({
          user: response.data.user
        })
      })
      .catch(err => {
        console.log('Error looking up user by token: ', err, err.response);
        this.setState({ user: null });
      })
    }
    else {
      console.log('No token in localStorage');
      this.setState({ user: null })
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div className="container">
            <Nav user={this.state.user} updateUser={this.getUser} />
            <Route exact path="/" component={Home} />
            <Route path="/login" component={
              () => (<Login user={this.state.user} updateUser={this.getUser} />)
            } />
            <Route path="/signup" component={
              () => (<Signup user={this.state.user} updateUser={this.getUser} />)
            } />
            <Route path="/profile" component={
              () => (<Profile user={this.state.user} />)
            } />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
