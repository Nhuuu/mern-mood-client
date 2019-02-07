import React from 'react'


const Weather = (props) => {
    return (
      <div className="weather-result">
        <div className={'results-weather-bg-' + props.cssClass}></div>
        <h3>Current weather is:</h3>
         <div> current weather summary: {props.summary} </div>
         <div> current temperature: {props.temp}℉ </div>
         <div> current background image from props.icon: {props.cssClass} </div>

      </div>
    )
}

export default Weather;
