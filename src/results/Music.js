import React, { Component } from 'react'



class Music extends Component {
	constructor(){
		super()
		this.state = {
			Music: ''
		}
	}

	// componentDidMount(){
	// 	this.getMusic()
	// }	

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
        	<h3>Need some music? Under Construction</h3>
        	<div>
        		<h1>{ this.state.music }</h1>
        		<button>Spotify</button>
        	</div>
        </div>
      );
  }
}

export default Music
