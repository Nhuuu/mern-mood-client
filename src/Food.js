import React, { Component } from 'react'


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

	//Grab Food
	// getFood = () => {
	// 	fetch()
	// 	.then(response => {
	// 		return response.json()
	// 	})
	// 	.then(json => {
	// 		console.log(json)
	// 		this.setState({ foods: json })
	// 	})
	// 	.catch(err => {
	// 		console.log(err)
	// 	})
	// }

  render() {
    return(
    	<div>
        	<h3> This displays your mood page </h3>
        	<div>
        		<h1>{ this.state.food }</h1>
        	</div>
        </div>
      );
  }
}

export default Food
