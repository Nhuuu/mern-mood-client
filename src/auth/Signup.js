import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SERVER_URL from '../constants/server';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

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
    axios.post(`${SERVER_URL}/auth/signup`, this.state)
    .then(response => {
      console.log('Success', response)
      localStorage.setItem('serverToken', response.data.token)
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
      );
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
      <Image src='https://res.cloudinary.com/kellyp/image/upload/v1549305186/smileface.png' className="App-logo" alt="logo"/> Signup as new user
    </Header>
    <Form size='large' onSubmit={this.handleSubmit}>

      <Segment stacked>
        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' value={this.state.email} onChange={this.handleEmailChange}/>
        <Form.Input
          fluid
          icon='lock'
          iconPosition='left'
          placeholder='Name'
          type='text'
          value={this.state.name} 
          onChange={this.handleNameChange}
        />
        <Form.Input
          fluid
          icon='lock'
          iconPosition='left'
          placeholder='Password'
          type='password'
          value={this.state.password} 
          onChange={this.handlePasswordChange}
        />
        <Form.Input
          fluid
          icon='lock'
          iconPosition='left'
          placeholder='Location'
          type='text'
          value={this.state.location} 
          onChange={this.handleLocationChange}
        />


        <Button color='teal' fluid size='large' name="action">
          Sign Up Now
        </Button>
      </Segment>

    </Form>
  </Grid.Column>
</Grid>
</div>
      );
  }
}

export default Signup;


