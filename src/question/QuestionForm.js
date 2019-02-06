import React, { Component } from 'react'
import SERVER_URL from '../constants/server';
import Question from './Question';
import {Row, Input} from 'react-materialize'
import Loader from 'react-loader-spinner'
import '../App.css';

class QuestionForm extends Component {
	constructor(){
		super()
		this.state = {
			category: '',
			score: 0,
			timestamp: new Date(),
			// average: 0,
			// mentalQs: [],
			// physicalQs: [],
			// emotionalQs: [],
			isLoading: true,  // loader
			currentQuestions: []
		}
	}

	componentDidMount(){
		this.getQuestions()
		setTimeout(() => this.setState({isLoading: false}), 1000)  //  Set to 3 sec timeout to see the effect
	}

	// Grab questions
	getQuestions = () => {
		fetch(SERVER_URL + '/question')
		.then(response => {
			return response.json()
		})
		.then(json => {
<<<<<<< HEAD
			console.log('question JSON', json)
=======
>>>>>>> e9fb73ddc30ac155ef34cc4dbd93cb1f77326a81
			// const questionArr = []
			// questionArr.push(json[0].question)
			// this.setState({ questions: questionArr[0] })
			// this.setState({ currentCategory: questionArr[0] })

			// console.log(this.state.questions)
			// console.log(this.state.currentQuestions)

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
			// console.log('this is json', mentalQs)
			// console.log('this is json', physicalQs)
			// console.log('this is json', emotionalQs)
		})
		.catch(err => {
			console.log(err)
		})
	}

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
			this.props.rerender() // redirect here, if cat is mental, redirect to physical 
			// <Redirect to=`${next}` />  const next  
		})
		.catch(err => {
			console.log('Error fetching data', err) 
		})
	}


  	render() {
			if(this.state.isLoading){
				return(
					<div class="loading"><Loader type="Hearts" color="#B0C0BF" height={120} width={120} /> </div>
				)
			}
	    return(
			<div className="question-form">
					<form onSubmit={this.postAnswer}>
    				 <Question question={this.getRandomQ()}/>
      			 <Input type="hidden" name="category" value="mental" onChange={this.storeInput} />
			<Row>
				<Input name='group1' type='checkbox' value='1' label='1' className='filled-in' defaultChecked='checked' onChange={this.storeInput}/>
				<Input name='group1' type='checkbox' value='2' label='2' className='filled-in' defaultChecked='checked' onChange={this.storeInput}/>
				<Input name='group1' type='checkbox' value='3' label='3' className='filled-in' defaultChecked='checked' onChange={this.storeInput}/>
				<Input name='group1' type='checkbox' value='4' label='4' className='filled-in' defaultChecked='checked' onChange={this.storeInput}/>
				<Input name='group1' type='checkbox' value='5' label='5' className='filled-in' defaultChecked='checked' onChange={this.storeInput}/>
				              {/*<input type="hidden" name="average" onChange={this.storeInput} />*/}
				  <input type="submit" value="Your day will be..." />
			</Row>
<<<<<<< HEAD
  </form>
</div>
	    
=======
    		</form>
		</div>
	   
>>>>>>> e9fb73ddc30ac155ef34cc4dbd93cb1f77326a81
	    )
  	}
}

export default QuestionForm;