import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom';
import SERVER_URL from './constants/server'
import {Row, Input} from 'react-materialize'
import Loader from 'react-loader-spinner'
import './App.css'
import axios from 'axios'

class QuestionForm extends Component {
	constructor(){
		super()
		this.state = {
			score: 0,
			isLoading: true,
			isSubmit: false
		}
	}

	componentDidMount(){
		setTimeout(() => this.setState({isLoading: false}), 1000) 
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
				<div>
					<h4 className="center-style-title">How's your mood today?</h4>
					<div className="center-style">
					<form onSubmit={this.postAnswer}>
						<Row>
							<Input name='score' type='radio' value='1' label='1' className='filled-in' onChange={this.storeInput}/>
							<Input name='score' type='radio' value='2' label='2' className='filled-in' onChange={this.storeInput}/>
							<Input name='score' type='radio' value='3' label='3' className='filled-in' onChange={this.storeInput}/>
							<Input name='score' type='radio' value='4' label='4' className='filled-in' onChange={this.storeInput}/>
							<Input name='score' type='radio' value='5' label='5' className='filled-in' onChange={this.storeInput}/>
					    <button class="btn waves-effect waves-light orange lighten-2" type="submit" name="action">Let's check!
		    			<i class="material-icons right">arrow_forward</i> </button>
						</Row>
		    	</form>
				</div>
			</div>
			)
		}
    	return(
				<div>
					<p><Link to="/login">Log In</Link> or <Link to="/signup">Sign up</Link> to get started!</p>
				</div>
      );
	}
}

export default QuestionForm;