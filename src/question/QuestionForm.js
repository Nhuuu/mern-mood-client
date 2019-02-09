import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import SERVER_URL from '../constants/server'
import {Row, Input} from 'react-materialize'
import Loader from 'react-loader-spinner'
import '../App.css'
// import Rating from 'react-rating'
import Axios from 'axios'

class QuestionForm extends Component {
	constructor(){
		super()
		this.state = {
			score: 0,
			isLoading: true, // loader
			user: null,
			isSubmit: false
		}
	}

	componentDidMount(){
		setTimeout(() => this.setState({isLoading: false}), 1000)  //  Set to 3 sec timeout to see the effect
	}

// Update state to reflect user input - store input
	storeInput = (e) => {
		this.setState({
			score: e.target.value
		})
 	}
  
// POST form answers to the fetch call
	postAnswer = (e) => {
		e.preventDefault()
		let token = localStorage.getItem('serverToken');
		Axios.post(SERVER_URL+'/answer/user/'+this.props.user.id, {
			score: this.state.score,
			headers: { 'Authorization': `Bearer ${token}` }
		})
		.then(json => {
			this.setState({ isSubmit: true })
		})
		.catch(err => {
			console.log('Error fetching data', err)
		})
	}

	render() {
		// var Rating = require('react-rating');
		if(this.state.isLoading){
			return(
				<div className="loading"><Loader type="Hearts" color="#B0C0BF" height={120} width={120} /> </div>
			)
		} 
		if (this.state.isSubmit){
			return (
				<Redirect to={'/result'} />
			)				
		}
		return(
			<div className="question-form">
				{this.props.question}
				<form onSubmit={this.postAnswer}>
					<Row>
						<Input name='score' type='radio' value='1' label='1' className='filled-in' onChange={this.storeInput}/>
						<Input name='score' type='radio' value='2' label='2' className='filled-in' onChange={this.storeInput}/>
						<Input name='score' type='radio' value='3' label='3' className='filled-in' onChange={this.storeInput}/>
						<Input name='score' type='radio' value='4' label='4' className='filled-in' onChange={this.storeInput}/>
						<Input name='score' type='radio' value='5' label='5' className='filled-in' onChange={this.storeInput}/>
				    <Input type="submit" value="Your day will be..." />
					</Row>
	    	</form>
			</div>
		)
	}
}

export default QuestionForm;
