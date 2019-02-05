import React, { Component } from 'react';
import SERVER_URL from '../constants/server';

class Question extends Component {
	constructor(){
		super()
		this.state = {
			questions: [{}]
		}
	}

	componentDidMount(){
		this.getQuestion()
	}

	// Grab questions
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


  	render() {
	    return(
	    	<div>
	        <h3>{this.question.mental[0].question} </h3>    	
	        </div>
	      );
  }
}

export default Question;
