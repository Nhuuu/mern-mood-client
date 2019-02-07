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
      categories: ['mental', 'physical', 'emotional'],
      currentCategory: '',
      currentQuestions: []
    }
  }

  componentDidMount = () => {
    this.getUser()
    this.setCategory()
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

// Check this, this should remove the first index everytime a question is answered on the form.
  setCategory = () => {
    console.log('Category set')
    this.setState({
      currentCategory: this.state.categories[0]
    })
    this.state.categories.splice(0, 1)
  }



  // Grab questions need to tie  to category
  getQuestions = () => {
    // let token = localStorage.getItem('serverToken');
    // axios.post(SERVER_URL + '/question', {
    //   headers: { 'Authorization': `Bearer ${token}` }
    // })
    fetch(SERVER_URL + '/question')
    .then(response => {
      return response.json()
    })
    .then(json => { 
      console.log('Retreiving questions', json)
      const questionArr = json[0].question
      if(this.state.currentCategory === 'mental'){
        const mentalQs = []
        questionArr.mental.forEach((q) => {
          return mentalQs.push(q.question)
        })
        this.setState({ currentQuestions: mentalQs })
        console.log('this is json', this.state.currentQuestions)        
      }
      else if(this.state.currentCategory === 'physical'){
        const physicalQs = []
        questionArr.physical.forEach((q) => {
          return physicalQs.push(q.question)
        })  
        this.setState({ currentQuestions: physicalQs })
        console.log('this is json', this.state.currentQuestions)              
      } else {
        const emotionalQs = []
        questionArr.emotional.forEach((q) => {
          return emotionalQs.push(q.question)
        })
        this.setState({ currentQuestions: emotionalQs })
        console.log('this is json', this.state.currentQuestions)        
      }   
    })
    .catch(err => {
      console.log(err)
    })
  }

  // Need a random question generate function
  getRandomQ = (q) => {
    console.log('Random Question Generating')
    const randQ = this.state.currentQuestions
    return randQ[Math.floor(randQ.length * Math.random())]
  }


  render() {
    return (
      <div>
        <Router>
          <div className="home-main">
          <img src={require('./images/home.jpg')} className="main-bg" />
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
            <Route path="/mental" component={ 
              () => (<QuestionForm user={this.state.user} cat={this.state.currentCategory} question={this.getRandomQ()}/>)
            } />
            <Route path="/physical" component={ 
              () => (<QuestionForm user={this.state.user} cat={this.state.currentCategory} question={this.getRandomQ()}/>)
            } />
            <Route path="/emotional" component={ 
              () => (<QuestionForm user={this.state.user} cat={this.state.currentCategory} question={this.getRandomQ()}/>)
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
