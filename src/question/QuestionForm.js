import React, { Component } from 'react'
import Question from './Question'
import SERVER_URL from './constants/server'

class QuestionForm extends Component {
	constructor(){
		super()
		this.state = {
			category: '',
			score: 0,
			timestamp: new Date(),
			average: 0
		}
	}


	// Update state to reflect user input - store input
	storeInput = (e) => {
		this.setState({
			category: e.target.value,
			score: e.target.value,
			average: // average all 3 score inputs	
		})
	}
	

	// POST form answers to the fetch call
	postAnswer = (q) => {
		e.preventDefault()
		fetch(SERVER_URL, {
			method: "POST",
			body: JSON.stringify(this.state),
			headers: { 'Content-Type': 'application/json' }
		})
		.then(response => response.json())
		.then(json => {
			console.log(json)
		})
		.catch(err => {
			console.log('Error fetching data', err) 
		})
	}


  	render() {
	    return(
	    	<div className="question-form">
	        	<form onSubmit={this.postAnswer}>
	        		<Question /> 
	        		<input type="hidden" name="category" value={this.state.category}>
	        		<input type="radio" value="1" name="score">
	        		<input type="radio" value="2" name="score">
	        		<input type="radio" value="3" name="score">
	        		<input type="radio" value="4" name="score">
	        		<input type="radio" value="5" name="score">
	        		<input type="hidden" name="timestamp">
	        		<input type="hidden" name="average">
	        		<input type="submit" value="Your day will be...">
	        	</form>
	        </div>
	    )
  	}
}

export default QuestionForm
