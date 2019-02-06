import React from 'react'


const Weather = (props) => {
    return (
      <div className="weather-result">
        <h3>Current weather is:</h3>
  
         <div> current weather summary: {props.summary} </div>
         <div> current temperature: {props.temp}℉ </div>

      </div>
    )
}

export default Weather
