import React, { Component } from 'react'
import SERVER_URL from './constants/server';


export default class ProfileEdit extends Component {
  constructor(){
    super();
    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    this.setState(this.props.current)
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
    console.log('About to edit name', this.state);
    console.log(this.props.user.id)
    fetch(SERVER_URL+'/profile/edit/'+this.props.user.id, {
      method: 'PUT',
      body: JSON.stringify(this.state), // data to send to the server
      headers: {
        'Content-Type': 'application/json' // let the server know what data is coming
      }
    })
    .then(response => {
      console.log(response)
      response.json()
    })
    .then(json => {
      console.log(json);
      this.props.udpateUser();
    })
    .catch(error => {
        console.log('ERROR POSTING DATA', error)
    })
  }

  firstCapitalization = (firstName) => {
    return firstName.charAt(0).toUpperCase() + firstName.slice(1)
  }

  render() {
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
