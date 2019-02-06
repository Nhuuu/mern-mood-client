import React, { Component } from 'react';
import SERVER_URL from '../constants/server'


const Weather = (props) => {

    return(
    	<div> <h3>The weather is currently:</h3>
    	{props.weather}
        </div>
      );
  }

export default Weather
