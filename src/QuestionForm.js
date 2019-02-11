import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import SERVER_URL from './constants/server'
import {Row, Input} from 'react-materialize'
import Loader from 'react-loader-spinner'
import './App.css'
// import Rating from 'react-rating'
import axios from 'axios'

class QuestionForm extends Component {
	constructor(){
		super()
		this.state = {
			score: 0,
			isLoading: true, // loader
			isSubmit: false,
			currentQuestion: ''
		}
	}

	componentDidMount(){
		this.getQuestion()
		setTimeout(() => this.setState({isLoading: false}), 1000)  //  Set to 3 sec timeout to see the effect
	}

  getQuestion = () => {
    let token = localStorage.getItem('serverToken');
    axios.post(SERVER_URL + '/question', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(json => { 
      const questionArr = json.data[0].questions
      const questions = questionArr.map((q) => {
        return q.question
      })
        const randQ = questions[Math.floor(questions.length * Math.random())]
        this.setState({ currentQuestion: randQ })
    })
    .catch(err => {
      console.log(err)
    })
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
		axios.post(SERVER_URL+'/answer/user/'+this.props.user.id, {
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
		if(this.props.user){
			return(
				<div className="question-form">
					{this.state.currentQuestion}
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
    	return(
				<div>
					<p><a href="/login">Log In</a> or <a href="/signup">Sign up</a> to get started!</p>
				</div>
      );
	}
}

export default QuestionForm;