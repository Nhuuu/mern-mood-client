import React from 'react'


const Weather = (props) => {
    return (
      <div className="weather-result">
        <h3>Current weather is:</h3>
  
         <div> {props.weathers} </div>

      </div>
    )
}

export default Weather
