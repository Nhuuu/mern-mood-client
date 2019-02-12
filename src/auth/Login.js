import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SERVER_URL from '../constants/server';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleEmailChange = (e) => { this.setState({ email: e.target.value }); }

  handlePasswordChange = (e) => { this.setState({ password: e.target.value }); }

  handleSubmit = (e) => {
    e.preventDefault();
    // SEND DATA TO SERVER
    console.log('About to login', this.state)
    axios.post(`${SERVER_URL}/auth/login`, this.state)
    .then(response => {
      console.log('Success in submitting login form', response);
      localStorage.setItem('serverToken', response.data.token);
      this.props.updateUser()
    })
    .catch(err => {
      console.log('Error when loggin in: ', err.response.data)
    })
  }

  render() {
    if(this.props.user){
      return (<Redirect to="/question" />);
    }
    return(


<div className='login-form'>
{/*
  Heads up! The styles below are necessary for the correct render of this example.
  You can do same with CSS, the main idea is that all the elements up to the `Grid`
  below must have a height of 100%.
*/}
<style>{`
  body > div,
  body > div > div,
  body > div > div > div.login-form {
    height: 100%;
  }
`}</style>
<Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
  <Grid.Column style={{ maxWidth: 450 }}>
    <Header as='h2'  textAlign='center'>
      <Image src='https://res.cloudinary.com/kellyp/image/upload/v1549305186/smileface.png' className="App-logo" alt="logo"/> Log-in to your account
    </Header>
    <Form size='large' onSubmit={this.handleSubmit}>

      <Segment stacked>
        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' value={this.state.email} onChange={this.handleEmailChange}/>
        <Form.Input
          fluid
          icon='lock'
          iconPosition='left'
          placeholder='Password'
          type='password'
          value={this.state.password} 
          onChange={this.handlePasswordChange}
        />

        <Button color='teal' fluid size='large' name="action">
          Login
        </Button>
      </Segment>

    </Form>
    <Message>
      New to us? <a href='/signup'>Sign Up</a>
    </Message>
  </Grid.Column>
</Grid>
</div>

    );
  }
}

export default Login;