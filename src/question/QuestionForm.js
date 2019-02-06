import React, { Component } from 'react'
import SERVER_URL from '../constants/server';
import Question from './Question';
import Loader from 'react-loader-spinner'

class QuestionForm extends Component {
	constructor(){
		super()
		this.state = {
			category: [],
			score: 0,
			// average: 0,
			mentalQs: [],
			physicalQs: [],
			emotionalQs: [],
			isLoading: true,  // loader
			// questions: [{}],
			// currentCategory: {}
		}
	}

	componentDidMount(){
		this.getQuestions()
		setTimeout(() => this.setState({isLoading: false}), 2000)  //  Set to 3 sec timeout to see the effect
	}

	// Grab questions
	getQuestions = () => {
		fetch(SERVER_URL + '/question')
		.then(response => {
			return response.json()
		})
		.then(json => {
			// const questionArr = []
			// questionArr.push(json[0].question)
			// this.setState({ questions: questionArr[0] })
			// this.setState({ currentCategory: questionArr[0].mental })
			// // this.state.questions.splice(0, 1)
			// console.log(this.state.questions)
			// console.log(this.state.currentCategory)


// indiv categories >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>			
			const mentalArr = json[0].question.mental
			const mentalQs = []
			const oneMentalQ = mentalArr.forEach((q) => {
				return mentalQs.push(q.question)
			})
			const physicalArr = json[0].question.physical
			const physicalQs = []
			const onePhysicalQ = physicalArr.forEach((q) => {
				return physicalQs.push(q.question)
			})
			const emotionalArr = json[0].question.emotional
			const emotionalQs = []
			const oneEmotionalQ = emotionalArr.forEach((q) => {
				return emotionalQs.push(q.question)
			})
			this.setState({ mentalQs: mentalQs })
			this.setState({ physicalQs: physicalQs })
			this.setState({ emotionalQs: emotionalQs })
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
			// console.log('this is json', json[0].question)
			// console.log('this is json', physicalQs)
			// console.log('this is json', emotionalQs)
		})
		.catch(err => {
			console.log(err)
		})
	}

	// random category of questions


	// Need a random question generate function
	getRandomQ = (q) => {
		const mRand = this.state.mentalQs
		return mRand[Math.floor(mRand.length * Math.random())]
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
			if(this.state.isLoading){
				return(
					<div className="loading"><Loader type="Hearts" color="#B0C0BF" height={120} width={120} /> </div>
				)
			}
	    return(
	    	<div className="question-form">
       			<form onSubmit={this.postAnswer}>
	        		<Question question={this.getRandomQ()}/>
	        		<input type="hidden" name="category" value={this.state.category} onChange={this.storeInput} />
	        		<input type="radio" value="1" name="score" onChange={this.storeInput} />
	        		<input type="radio" value="2" name="score" onChange={this.storeInput} />
	        		<input type="radio" value="3" name="score" onChange={this.storeInput} />
	        		<input type="radio" value="4" name="score" onChange={this.storeInput} />
	        		<input type="radio" value="5" name="score" onChange={this.storeInput} />
	        		{/*<input type="hidden" name="average" onChange={this.storeInput} />*/}
	        		<input type="submit" value="Your day will be..." />
		     	</form>
	     	</div>
	    )
  	}
}

export default QuestionForm
