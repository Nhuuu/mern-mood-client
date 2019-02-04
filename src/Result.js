import React from 'react'
import SERVER_URL from './constants/server'


const Result = () => {
  return(
  	<div>
      	<div>
          <div className="weather-field">
      		  <h3>WTH, It's Raining!</h3>
            <h5>Temp</h5>
          </div>
          <div className="music-field">
      		  <h3>Need some music?</h3>
            <button>Spotify</button>
          </div>
          <div className="food-field">
      		  <h3>Eat this</h3>
          </div>
      	 </div>
      </div>
    )
}

export default Result
