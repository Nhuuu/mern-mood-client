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
import Profile_Edit from './Profile_Edit';
import QuestionForm from './question/QuestionForm';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      categories: ['mental', 'physical', 'emotional'],
      currentCategory: ''
    }
  }

  componentDidMount = () => {
    this.getUser()
    this.setCategory()
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

// Check this, this should remove the first index everytime a question is answered on the form.
  setCategory = () => {
    this.setState({
      currentCategory: this.state.categories[0]
    })
    this.state.categories.splice(0, 1)

    // maybe this will work ?
    // let newCategoriesArr = this.state.categories
    // this.setState({
    //   currentCategory: newCategoriesArr
    // })
    // newCategoriesArr.splice(0, 1)

  }


  render() {
    return (
      <div>
        <Router>
          <div>
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
            <Route path="/questionform" component={ 
              () => (<QuestionForm user={this.state.user} cat={this.state.currentCategory} />)
            } />
            <Route path="/profile/edit" component={
              () => (<Profile_Edit user={this.state.user} updateUser={this.getUser} />)
            } />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
