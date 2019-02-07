import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import SERVER_URL from '../constants/server';
import Question from './Question';
import {Row, Input} from 'react-materialize'
import Loader from 'react-loader-spinner'
import '../App.css';
import Rating from 'react-rating';

class QuestionForm extends Component {
	constructor(){
		super()
		this.state = {
			category: '',
			score: 0,
			timestamp: new Date(),
			// average: 0,
			isLoading: true,  // loader

		}
	}

	componentDidMount(){
		// this.getQuestions()
		setTimeout(() => this.setState({isLoading: false}), 1000)  //  Set to 3 sec timeout to see the effect
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
			this.props.question()
			// this.props.rerender() 
			// redirect here, if cat is mental, redirect to physical 
			// <Redirect to=`${next}` />  const next  
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
	    return(
			<div className="question-form">
				<Question question={this.props.question}/>  
				<form onSubmit={this.postAnswer}>
	      			    <Input type="hidden" name="category" value={this.props.cat} onChange={this.storeInput} />
					<Row>
						<Input name='score' type='radio' value='1' label='1' className='filled-in' onChange={this.storeInput}/>
						<Input name='score' type='radio' value='2' label='2' className='filled-in' onChange={this.storeInput}/>
						<Input name='score' type='radio' value='3' label='3' className='filled-in' onChange={this.storeInput}/>
						<Input name='score' type='radio' value='4' label='4' className='filled-in' onChange={this.storeInput}/>
						<Input name='score' type='radio' value='5' label='5' className='filled-in' onChange={this.storeInput}/>
				        {/*<input type="hidden" name="average" onChange={this.storeInput} />*/}
				        <input type="submit" value="Your day will be..." />
					</Row>
	    		</form>
			</div>
	    )
  	}
}

export default QuestionForm;
