import React from 'react'


const Weather = (props) => {
    return (
      <div>
        <h3>Current weather is:</h3>
  
         <div> {props.weather} </div>

      </div>
    )
}

export default Weather
