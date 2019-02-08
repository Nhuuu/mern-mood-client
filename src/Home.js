import React, { Component } from 'react';
import Loader from 'react-loader-spinner'; //module for loading gif
import {Row, Input} from 'react-materialize';
import SERVER_URL from './constants/server';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

class Home extends Component {
  constructor(){
    super()
    this.state = {
      score: '',
      isLoading: true,  // loader
      isSubmit: false
    }
  }

  componentDidMount(){
    // this.setState({isLoading: false}) // This is used for acutal loader usage:
    setTimeout(() => this.setState({isLoading: false}), 1000)  //  Set to 3 sec timeout to see the effect
  }

  	// Update state to reflect user input - store input
  storeInput = (e) => {
		this.setState({
			score: e.target.value
		})
  }

  submitState = (e) => {
    this.setState({
      isSubmit: true
    });
  }

  
  // POST form answers to the fetch call
    postAnswer = (e) => {
      e.preventDefault()
      console.log(this.state.score)
      console.log(this.state.isSubmit)
      let token = localStorage.getItem('serverToken');
      Axios.post(SERVER_URL+'/answer/user/'+this.props.user.id, {
        score: this.state.score,
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(json => {

      })
      .catch(err => {
        console.log('Error fetching data', err)
      })
    }

  render() {
    if(this.state.isLoading){
      return(
        <div className="loading"><Loader type="Hearts" color="#B0C0BF" height={120} width={120} /> </div>
      )
    }
    return(
    	<div>
        <h4>Welcome,</h4>
        <h3>How are you today?</h3>
        <form onSubmit={this.postAnswer}>
					<Row>
						<Input name='score' type='radio' value='1' label='1' className='filled-in' onChange={this.storeInput} />
						<Input name='score' type='radio' value='2' label='2' className='filled-in' onChange={this.storeInput} />
						<Input name='score' type='radio' value='3' label='3' className='filled-in' onChange={this.storeInput} />
						<Input name='score' type='radio' value='4' label='4' className='filled-in' onChange={this.storeInput} />
						<Input name='score' type='radio' value='5' label='5' className='filled-in' onChange={this.storeInput} />
				        {/*<input type="hidden" name="average" onChange={this.storeInput} />*/}
				        <input type="submit" value="Your day will be..." />
					</Row>
	    		</form>
      </div>
      //	<button> Sign up or login </button> //=>redirect to signup/login page
      );
  }
}


export default Home;
