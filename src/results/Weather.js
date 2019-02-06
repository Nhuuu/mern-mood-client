import React, { Component } from 'react';
import SERVER_URL from '../constants/server'

const Weather = () =>{
	return(
    	<div>
        	<div>
        		<h3>{this.state.weather}</h3>
        		<h3>{this.state.temp}</h3>
        	</div>
        </div>
      );
}

export default Weather
