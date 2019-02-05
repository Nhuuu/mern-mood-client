import React, { Component } from 'react'
import SERVER_URL from '../constants/server'

class Food extends Component {
	constructor(){
		super()
		this.state = {
			food: ''
		}
	}

	componentDidMount(){
		this.getFood()
	}

	// Grab food
	getFood = () => {
		fetch(SERVER_URL)
		.then(response => {
			return response.json()
		})
		.then(json => {
			console.log(json)
			// this.setState({ food: json })
		})
		.catch(err => {
			console.log(err)
		})
	}

  render() {
    return(
    	<div>
			<h3>Eat this</h3>
			<h1>{ this.state.food }</h1>
        </div>
      );
  }
}

export default Food
