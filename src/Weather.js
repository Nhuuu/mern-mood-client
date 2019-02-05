import React, { Component } from 'react'
import SERVER_URL from './constants/server'


class Weather extends Component {
	constructor(){
		super()
		this.state = {
			weather: 23
		}
	}

	componentDidMount(){
		this.getWeather()
	}	

	//Grab user location from server and then grab weather
	getWeather = () => {
		fetch(SERVER_URL)
		.then(response => {
			return response.json()
		})
		.then(json => {
			console.log(json)
			this.setState({ weathers: json })
		})
		.catch(err => {
			console.log(err)
		})
	}

  render() {
    return(
    	<div>
        	<h3>WTH, It's Raining!</h3>
        	<div>
        		<h1>{ this.state.weather }</h1>
        	</div>
        </div>
      );
  }
}

export default Weather
