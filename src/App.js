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
import Result from './results//Result';
import Signup from './auth/Signup';
import ProfileEdit from './ProfileEdit';
import QuestionForm from './question/QuestionForm';
import TestComponent from './auth/TestComponent';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      currentQuestions: []
    }
  }

  componentDidMount = () => {
    this.getUser()
    this.getQuestions()
    this.getRandomQ()
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
        this.setState({ user: null });
      })
    }
    else {
      console.log('No token in localStorage');
      this.setState({ user: null })
    }
  }

  // Grab questions
  getQuestions = () => {
    let token = localStorage.getItem('serverToken');
    // console.log('THIS IS THE TOKEN', token)
    axios.post(SERVER_URL + '/question', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(json => { 
      console.log("we here", json);
      const questionArr = json.data[0].question
        const questions = questionArr.mental.map((q) => {
          return q.question
        })
        this.setState({ currentQuestions: questions })
        // console.log('this is json', this.state.currentQuestions)
    })
    
    .catch(err => {
      console.log(err)
    })
  }

  // Need a random question generate function
  getRandomQ = (q) => {
    const randQ = this.state.currentQuestions
    return randQ[Math.floor(randQ.length * Math.random())]
  }


  render() {
    return (
      <div>
        <Router>
          <div className="home-main">
          <img src={require('./images/home.jpg')} className="main-bg" alt="bg"/>
            <Nav user={this.state.user} updateUser={this.getUser} />
            <Route exact path="/" component={Home} />
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
              () => (<QuestionForm user={this.state.user} question={this.getRandomQ()}/>)
            } />                       
            <Route path="/profile/edit" component={
              () => (<ProfileEdit user={this.state.user} updateUser={this.getUser} />)
            } />
            <Route path='/test-component' component={
              () => (<TestComponent user={this.state.user} updateUser={this.getUser} />)
            } />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
