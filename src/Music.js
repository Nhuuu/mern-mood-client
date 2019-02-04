import React, { Component } from 'react'



class Music extends Component {
	constructor(){
		super()
		this.state = {
			Music: ''
		}
	}

	componentDidMount(){
		this.getMusic()
	}	

	//Grab music
	// getMusic = () => {
	// 	fetch(DARKSKY_URL)
	// 	.then(response => {
	// 		return response.json()
	// 	})
	// 	.then(json => {
	// 		console.log(json)
	// 		this.setState({ weathers: json })
	// 	})
	// 	.catch(err => {
	// 		console.log(err)
	// 	})
	// }

  render() {
    return(
    	<div>
        	<h3> This displays music suggestion </h3>
        	<div>
        		<h1>{ this.state.music }</h1>
        	</div>
        </div>
      );
  }
}

export default Music
