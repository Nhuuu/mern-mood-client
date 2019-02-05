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
		let newState;
		this.setState({
			category: e.target.value,
			score: e.target.value,
			average: // average all 3 score inputs	
		})
	}
	

	// POST form answers to the fetch call
	postAnswer = (e) => {
		e.preventDefault()
		fetch(SERVER_URL, {
			method: "POST",
			body: JSON.stringify(this.state),
			headers: { 'Content-Type': 'application/json' }
		})
		.then(response => response.json())
		.then(json => {
			console.log(json)
			this.props.rerender()
		})
		.catch(err => {
			console.log('Error fetching data', err) 
		})
	}


  	render() {
	    return(
        	<form onSubmit={this.postAnswer}>
	        	<div className="question-form">
	        		<Question /> 
	        		<input type="hidden" name="category" value={this.state.category} onChange={this.storeInput} />
	        		<input type="radio" value="1" name="score" onChange={this.storeInput} />
	        		<input type="radio" value="2" name="score" onChange={this.storeInput} />
	        		<input type="radio" value="3" name="score" onChange={this.storeInput} />
	        		<input type="radio" value="4" name="score" onChange={this.storeInput} />
	        		<input type="radio" value="5" name="score" onChange={this.storeInput} />
	        		<input type="hidden" name="timestamp">
	        		<input type="hidden" name="average" onChange={this.storeInput} />
	        		<input type="submit" value="Your day will be...">
	     	   </div>
	     	 </form>
	    )
  	}
}

export default QuestionForm
