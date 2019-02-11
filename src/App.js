import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import SERVER_URL from './constants/server';
import './App.css';
import Footer from './layout/Footer';
import Home from './Home';
import Login from './auth/Login';
import Nav from './layout/Nav';
import Profile from './Profile';
import Result from './results//Result';
import Signup from './auth/Signup';
import ProfileEdit from './ProfileEdit';
import QuestionForm from './QuestionForm';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount = () => {
    this.getUser()
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
        this.setState({
          user: response.data.user
        })
      })
      .catch(err => {
        console.log('Error looking up user by token: ', err, err.response);
        this.setState({ user: null })
      })
    }
    else {
      console.log('No token in localStorage');
      this.setState({ user: null })
    }
  }

  render() {
    return (
      <div>
        <Router>
          <div className="home-main">
          <img src={require('./images/salty2.gif')} className="main-bg" alt="bg"/>
            <Nav user={this.state.user} updateUser={this.getUser} />
            <Route exact path="/" component={
              () => (<Home user={this.state.user} updateUser={this.getUser} />)
            } />
            <Route path="/login" component={
              () => (<Login user={this.state.user} updateUser={this.getUser} />)
            } />
            <Route path="/signup" component={
              () => (<Signup user={this.state.user} updateUser={this.getUser} />)
            } />
            <Route path="/profile" component={
              () => (<Profile user={this.state.user} updateUser={this.getUser} />)
            } />
            <Route path="/result" component={
              () => (<Result user={this.state.user} />)
            } />
            <Route path="/question" component={ 
              () => (<QuestionForm user={this.state.user} />)
            } />                       
            <Route path="/profile/edit" component={
              () => (<ProfileEdit user={this.state.user} updateUser={this.getUser} />)
            } />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;