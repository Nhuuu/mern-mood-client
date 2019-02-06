import React, { Component } from 'react';
import SERVER_URL from '../constants/server'


const Weather = (props) => {
    return (
      <div>
        <h3>Current weather is:</h3>
  
         <div> {props.weathers} </div>

      </div>
    )
}

export default Weather;
