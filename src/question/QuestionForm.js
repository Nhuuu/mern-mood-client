import React, { Component } from 'react'
import SERVER_URL from '../constants/server';
import Question from './Question';

class QuestionForm extends Component {
	constructor(){
		super()
		this.state = {
			category: '',
			score: 0,
			timestamp: new Date(),
			average: 0,
			questions: [{}]
		}
	}

	componentDidMount(){
		this.getQuestion()
	}
	
	getQuestion = () => {
		fetch(SERVER_URL + '/question')
		.then(response => {
			console.log('say something')
			return response.json()
		})
		.then(json => {
			this.setState({ question: json })
			console.log(json)
		})
		.catch(err => {
			console.log(err)
		})
	}

	// Update state to reflect user input - store input
	storeInput = (e) => {
		this.setState({
			category: e.target.value,
			score: e.target.value
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
	        		<Question question={this.question.mental[0].question}/> 
	        		<input type="hidden" name="category" value={this.state.category} onChange={this.storeInput} />
	        		<input type="radio" value="1" name="score" onChange={this.storeInput} />
	        		<input type="radio" value="2" name="score" onChange={this.storeInput} />
	        		<input type="radio" value="3" name="score" onChange={this.storeInput} />
	        		<input type="radio" value="4" name="score" onChange={this.storeInput} />
	        		<input type="radio" value="5" name="score" onChange={this.storeInput} />
	        		<input type="hidden" name="timestamp" />
	        		<input type="hidden" name="average" onChange={this.storeInput} />
	        		<input type="submit" value="Your day will be..." />
	     	   </div>
	     	 </form>
	    )
  	}
}

export default QuestionForm
