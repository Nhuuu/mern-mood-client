import React from 'react'

const Weather = (props) => {
    return (
      <div className="weather-result">
        <div className={'results-weather-bg-' + props.cssClass}></div>
        <div className={'results-weather-icon-' + props.cssClass}></div>
        {/* <h3>Current weather is:</h3> */}
        {/* <div>{props.cssClass}</div> */}
<<<<<<< HEAD
        <div style={{display: 'inline-block'}} className='results-weather-icon-thermometer'><span className="a">{props.temp} ℉</span>
=======
        <div><span class="a">{props.temp} ℉</span>
>>>>>>> 0629cbe076e022c2dca50e424bc878a4abf07c69
        </div>

      </div>
    )
}

export default Weather;

