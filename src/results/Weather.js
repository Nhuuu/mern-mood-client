import React, { Component } from 'react';
import SERVER_URL from '../constants/server'




class Weather extends Component {
	constructor(){
		super()
		this.state = {
			weather: '',
			temp:''
		}
	}

	componentDidMount(){
		 this.getWeather()
	}	

	//Grab user location from server and then grab weather
	getWeather = () => {
		let weather=[];
		let lat= 47.6062;
		let	lng= -122.3321;
		// let lng = locations.x;
		// let lat = locations.y;
		fetch(SERVER_URL)
		.then(response => {
			return response.json()
		})
		.then(json => {
			// this.setState({ weather: json })
			console.log(weather);
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
        		<h3>{this.state.weather}</h3>
        		<h3>{this.state.temp}</h3>
        	</div>
        </div>
      );
  }
}

export default Weather
