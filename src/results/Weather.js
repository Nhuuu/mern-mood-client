import React from 'react'

const Weather = (props) => {
    return (
      <div className="weather-result">
        <div className={'results-weather-bg-' + props.cssClass}></div>
        <div className={'results-weather-icon-' + props.cssClass}></div>
        {/* <h3>Current weather is:</h3> */}
        {/* <div>{props.cssClass}</div> */}
        <div style={{display: 'inline-block'}} className='results-weather-icon-thermometer'><span class="a">{props.temp} ℉</span>
        </div>

      </div>
    )
}

export default Weather;

