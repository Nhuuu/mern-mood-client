import React, { Component } from 'react';
import SERVER_URL from '../constants/server'


const Weather = () => {

    return(
    	<div>
    	{this.state.weather}
{/*        	<h3>WTH, It's Raining!</h3>
        	<div>
        		<h3>{this.state.weather}</h3>
        		<h3>{this.state.temp}</h3>
        	</div>*/}
        </div>
      );
  }

export default Weather
