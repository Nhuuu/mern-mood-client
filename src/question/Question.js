import React, { Component } from 'react';

class Question extends Component {
	constructor(){
		super()
		this.state = {
			question: ''
		}
	}

	componentDidMount(){
		this.getQuestion()
	}

	// Grab questions
	getQuestion = () => {
		fetch(SERVER_URL)
		.then(response => {
			return response.json()
		})
		.then(json => {
			console.log(json)
			// this.setState({ question: json })
		})
		.catch(err => {
			console.log(err)
		})
	}


  	render() {
	    return(
	    	<div>
	        	<h3> How tired are you today? </h3>
	        </div>
	      );
  }
}

export default Question;
